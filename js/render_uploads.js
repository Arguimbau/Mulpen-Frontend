const imageExtenstions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtenstions = ["mp4", "mkv", "webm", "mov", "avi"];
const audioExtenstions = ["mp3", "wav", "ogg"];

var fileTypeSelect = document.getElementById("file-type")

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
        audio.style.height = "50px"; // Set a fixed height for audio elements
        const source = document.createElement("source");
        source.src = url;
        source.type = "audio/mpeg";
        audio.appendChild(source);
        div.appendChild(audio);
    } else {
        return null
    }
    return div;
}

function clearMediaElements(container) {
    const mediaContainer = document.getElementById("media-container")
    // Assuming 'container' is the parent element that holds the created media elements
    while (mediaContainer.firstChild) {
        container.removeChild(container.firstChild);
    }
}

async function loadMedias() {
    const medias = await fetch(`${API_BASE}/media/all`, {
        method: "GET",
        mode: "cors",
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
            fullImage.classList.add("image-popout")
            fullImage.href = `${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`

            const gallery = document.createElement("div");
            gallery.classList.add("gallery")

            mediaContainer.appendChild(gallery)
            gallery.appendChild(fullImage);
            fullImage.appendChild(newElement)

           const imageText = document.createElement("div");
            imageText.classList.add("desc")
            imageText.textContent = media.description.toUpperCase()
            gallery.appendChild(imageText)

            imageText.addEventListener("click", () => {
                const closestGallery = imageText.closest(".gallery");

                if (closestGallery) {
                    const videoElement = closestGallery.querySelector("video");

                    if (videoElement) {
                        videoElement.click();
                    }
                }
            });

        }

    }
}

fileTypeSelect.addEventListener("change", async () => {
    const mediaContainer = document.getElementById("media-container")
    const descElements = mediaContainer.getElementsByClassName("desc");

    while (descElements.length > 0) {
        descElements[0].remove();
    }
    clearMediaElements(mediaContainer)
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

        video.addEventListener('click', () => {
            // Modify the appearance of the page when the video is clicked
            document.body.style.backgroundColor = ''; // Change background color to black, for example
            // Add more styling changes or other actions as needed
        });
    });
});