const imageExtensions = ["jpg", "jpeg", "png"];

function createDeleteButton(id) {
    const div = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.id= "deleteButton";
    deleteButton.textContent = "Slet";

    // Prevent the default anchor behavior
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        await deleteMedia(id);
    });

    div.appendChild(deleteButton);
    return div;
}

async function deleteMedia(id) {
    // Ask the user for confirmation
    const confirmed = window.confirm("Er du sikker på at du vil slette det valgte billede?");

    // If the user confirms, proceed with deletion
    if (confirmed) {
        try {
            const response = await fetch(`${API_BASE}/slideshow/deleteSlideshow/${id}`, {
                method: "DELETE",
                mode: "cors"
            });

            if (!response.ok) {
                console.error("Fejl ved sletning af billede");
                return;
            }

            // Remove the deleted media element from the UI
            const mediaElement = document.getElementById(`media-${id}`);
            if (mediaElement) {
                mediaElement.remove();
                location.reload();
            }
        } catch (error) {
            console.error("Fejl ved sletning af billede", error);
        }
    }
}


function createMediaElement(url, id) {
    const extension = url.split(".").pop();

    const div = document.createElement("div");

    if (imageExtensions.includes(extension)) {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Image";
        img.style.width = "200px";
        img.style.height = "200px";
        div.appendChild(img);
    }

    // Attach the event listener directly to the delete button
    const deleteButton = createDeleteButton(id);
    div.appendChild(deleteButton);

    return div;
}

async function loadSlideshow() {
    try {
        const response = await fetch(`${API_BASE}/slideshow/all`, {
            method: "GET",
            mode: "cors"
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch media: ${response.statusText}`);
        }

        const mediaContainer = document.getElementById("slideshow-container");
        const medias = await response.json();

        for (const media of medias) {
            const gallery = document.createElement("div");
            gallery.classList.add("gallery");
            const mediaElement = createMediaElement(`${API_BASE}/slideshow/uploadSlideshow/${encodeURIComponent(media.filePath)}`, media.id, media.description);
            mediaElement.id = `media-${media.id}`;
            mediaContainer.appendChild(gallery);
            gallery.appendChild(mediaElement);
        }
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadSlideshow();


});