const imageExtenstions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtenstions = ["mp4", "mkv", "webm", "mov", "avi"];
const audioExtenstions = ["mp3", "wav", "ogg"];

var fileTypeSelect = document.getElementById("file-type");

const videoModal = document.getElementById('videoModal');
const overlayContent = videoModal.querySelector('.overlay-content');

videoModal.addEventListener('click', () => {
    const videoInModal = overlayContent.querySelector('video');
    videoInModal.pause();
    videoInModal.controls = false;
    videoModal.style.display = 'none';
    overlayContent.innerHTML = '';
});

function createMediaElement(url) {
    const extension = url.split(".").pop();
    const div = document.createElement("div");

    if (imageExtenstions.includes(extension) && fileTypeSelect.value === "image") {
        const img = document.createElement("img");
        img.src = url;
        div.appendChild(img);
    } else if (videoExtenstions.includes(extension) && fileTypeSelect.value === "video") {
        const video = document.createElement("video");
        video.controls = false;
        const source = document.createElement("source");
        source.src = url;
        source.type = "video/mp4";
        video.appendChild(source);
        div.appendChild(video);
        video.addEventListener('click', (event) => {
            event.preventDefault();
            video.controls = true;
            video.play();
            overlayContent.appendChild(video.parentElement.parentElement.cloneNode(true));
            videoModal.style.display = 'flex';
            const descElement = video.parentElement.nextElementSibling;
            if (descElement && descElement.classList.contains("desc")) {
                descElement.style.display = 'none';
            }
        });
    } else if (audioExtenstions.includes(extension) && fileTypeSelect.value === "audio") {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.style.height = "50px"; // Set a fixed height for audio elements
        const source = document.createElement("source");
        source.src = url;
        audio.appendChild(source);
        div.appendChild(audio);
    } else {
        return null
    }
    return div;
}

function clearMediaElements(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

async function loadMedias() {
    const medias = await fetch(`${API_BASE}/media/all`, {
        method: "GET",
        mode: "cors"
    });

    const mediaContainer = document.getElementById("media-container");
    if (!medias.ok) {
        mediaContainer.textContent = "Error";
        return;
    }

    for (const media of await medias.json()) {
        const newElement = createMediaElement(`${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`);
        if (newElement != null) {

            const fullImage = document.createElement("a");
            fullImage.classList.add("image-popout");
            fullImage.href = `${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`;

            const gallery = document.createElement("div");
            gallery.classList.add("gallery");

            mediaContainer.appendChild(gallery);
            gallery.appendChild(fullImage);
            fullImage.appendChild(newElement);

            const imageText = document.createElement("div");
            imageText.classList.add("desc");
            imageText.textContent = media.description.toUpperCase();
            gallery.appendChild(imageText);
        }
    }
}

fileTypeSelect.addEventListener("change", async () => {
    const mediaContainer = document.getElementById("media-container");
    const descElements = mediaContainer.getElementsByClassName("desc");
    while (descElements.length > 0) {
        descElements[0].remove();
    }
    clearMediaElements(mediaContainer);
    await loadMedias();
});

document.addEventListener("DOMContentLoaded", async function () {
    await loadMedias();
});