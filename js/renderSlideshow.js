const imageExtenstions = ["jpg", "jpeg", "png"];

function createMediaElement(url) {
    const extension = url.split(".").pop();

    const div = document.createElement("div");

    if (imageExtenstions.includes(extension)) {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Image";
        div.appendChild(img);
        console.log(div)
    }

    return div;
}

async function loadSlideshow() {
    const medias = await fetch(`${API_BASE}/slideshow/all`, {
        method: "GET",
        mode: "cors"
    });

    const mediaContainer = document.getElementById("media-container");
    if (!medias.ok) {
        mediaContainer.textContent = "Error";
        return;
    }

    for (const media of await medias.json()) {
        const fullImage = document.createElement("a");
        fullImage.classList.add("image-popout")
        fullImage.href = `${API_BASE}/slideshow/uploadSlideshow/${encodeURIComponent(media.filePath)}`

        const gallery = document.createElement("div");
        gallery.classList.add("gallery")

        const newElement = createMediaElement(`${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`);

        mediaContainer.appendChild(gallery)
        gallery.appendChild(fullImage);
        fullImage.appendChild(newElement)
        gallery.appendChild(imageText)
    }
}

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