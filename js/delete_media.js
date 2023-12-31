const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "mkv", "webm", "mov", "avi"];
const audioExtensions = ["mp3", "wav", "ogg"];

function createDeleteButton(id) {
    const div = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Prevent the default anchor behavior
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        await deleteMedia(id);
    });

    div.appendChild(deleteButton);
    return div;
}


var authToken = localStorage.getItem("authToken")


async function deleteMedia(id) {
    // Ask the user for confirmation
    if (!authToken) {
        console.error("No user authentication token found");
        return Promise.reject(new Error("No user authentication token found"));
    }
    const confirmed = window.confirm("Er du sikker på at du vil slette den valgte side?");


    // If the user confirms, proceed with deletion
    if (confirmed) {
        try {
            const response = await fetch(`${API_BASE}/media/delete/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                console.error("Error deleting media");
                return;
            }

            // Remove the deleted media element from the UI
            const mediaElement = document.getElementById(`media-${id}`);
            if (mediaElement) {
                mediaElement.remove();
                location.reload();
            }
        } catch (error) {
            console.error("Error deleting media", error);
        }
    }
}


function createMediaElement(url, id, description) {
    const extension = url.split(".").pop();

    const div = document.createElement("div");

    if (imageExtensions.includes(extension)) {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Image";
        img.style.width = "250px";
        img.style.height = "250px";
        div.appendChild(img);
    } else if (videoExtensions.includes(extension)) {
        const video = document.createElement("video");
        video.controls = false;
        video.width = 320;
        video.height = 240;
        const source = document.createElement("source");
        source.src = url;
        source.type = "video/mp4";
        video.appendChild(source);
        div.appendChild(video);
    } else if (audioExtensions.includes(extension)) {
        const audio = document.createElement("audio");
        audio.controls = true;
        const source = document.createElement("source");
        source.src = url;
        source.type = "audio/mpeg";
        audio.appendChild(source);
        div.appendChild(audio);
    }

    // Display media description
    const imageText = document.createElement("div");
    imageText.classList.add("desc");
    imageText.textContent = description || ""; // Ensure description is not undefined
    div.appendChild(imageText);

    // Attach the event listener directly to the delete button
    const deleteButton = createDeleteButton(id);
    div.appendChild(deleteButton);

    return div;
}

async function loadMedias() {
    try {
        const response = await fetch(`${API_BASE}/media/all`, {
            method: "GET",
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch media: ${response.statusText}`);
        }

        const mediaContainer = document.getElementById("media-container");
        const medias = await response.json();

        for (const media of medias) {
            const gallery = document.createElement("div");
            gallery.classList.add("gallery");
            const mediaElement = createMediaElement(`${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`, media.id, media.description);
            mediaElement.id = `media-${media.id}`;
            mediaContainer.appendChild(gallery);
            gallery.appendChild(mediaElement);
        }
    } catch (error) {
        console.error(error);
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