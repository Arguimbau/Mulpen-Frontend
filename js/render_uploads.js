const imageExtenstions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtenstions = ["mp4", "mkv", "webm", "mov", "avi"];
const audioExtenstions = ["mp3", "wav", "ogg"];

var fileTypeSelect = document.getElementById("type")

function createMediaElement(url) {
    const extension = url.split(".").pop();

    const div = document.createElement("div");


    if (imageExtenstions.includes(extension) && fileTypeSelect.value === "image") {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Image";
        div.appendChild(img);
        console.log(div)
    } else if (videoExtenstions.includes(extension) && fileTypeSelect.value === "video") {
        const video = document.createElement("video");
        video.controls = false;
        video.width = 320;
        video.height = 240;
        const source = document.createElement("source");
        source.src = url;
        source.type = "video/mp4";
        video.appendChild(source);
        video.appendChild(source);
        div.appendChild(video);
    } else if (audioExtenstions.includes(extension) && fileTypeSelect.value === "audio") {
        const audio = document.createElement("audio");
        audio.controls = true;
        const source = document.createElement("source");
        source.src = url;
        source.type = "audio/mpeg";
        audio.appendChild(source);
        div.appendChild(audio);
    }

    return div;
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
        const imageText = document.createElement("div");
        imageText.classList.add("desc")
        imageText.textContent = media.description

        const fullImage = document.createElement("a");
        fullImage.classList.add("image-popout")
        fullImage.href = `${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`

        const gallery = document.createElement("div");
        gallery.classList.add("gallery")

        const newElement = createMediaElement(`${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`);

        mediaContainer.appendChild(gallery)
        gallery.appendChild(fullImage);
        fullImage.appendChild(newElement)
        gallery.appendChild(imageText)
    }
}

fileTypeSelect.addEventListener("change", async () => {
    await loadMedias()
})

document.addEventListener("DOMContentLoaded", async function () {
    await loadMedias();


    // Get all video elements on the page
    const videos = document.querySelectorAll('video');

// Function to start the preview for a specific video
    function startPreview(video) {
        video.muted = true;
        video.currentTime = 1;
        video.playbackRate = 0.5;
        video.play();
    }

// Function to stop the preview for a specific video
    function stopPreview(video) {
        video.currentTime = 0;
        video.playbackRate = 0.1;
        video.pause();
    }

// Event listeners for each video element
    videos.forEach((video) => {
        let previewTimeout = null;

        video.addEventListener('mouseenter', () => {
            startPreview(video);
            previewTimeout = setTimeout(() => stopPreview(video), 4000);
        });

        video.addEventListener('mouseleave', () => {
            clearTimeout(previewTimeout);
            previewTimeout = null;
            stopPreview(video);
        });
    });
});