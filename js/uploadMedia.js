function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var thumbnailInput = document.getElementById('thumbnailInput');
    var file = fileInput.files[0];
    var thumbnail = thumbnailInput.files[0];
    var description = document.getElementById('descriptionInput').value;

    var authToken = localStorage.getItem("authToken");

    if (!authToken) {
        console.error("No user authentication token found");
        var snackbar = document.getElementById('snackbar');
        snackbar.innerHTML = 'Der skete en fejl. Denne bruger har muligvis ikke rettigheder til denne funktion';
        snackbar.className = "show";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
        }, 8000);

        return Promise.reject(new Error("No user authentication token found"));
    }

    var formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail)

    // Check if thumbnail is available before appending
    if (thumbnail) {
        formData.append('thumbnail', thumbnail);
    }

    return fetch(`${API_BASE}/media/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
        mode: "cors",
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(message => {
            console.log("Server response:", message);
            var snackbar = document.getElementById('snackbar');
            snackbar.innerHTML = message;
            snackbar.className = "show";
            setTimeout(function () {
                snackbar.className = snackbar.className.replace("show", "");
            }, 8000);
        })
        .catch(error => {
            console.error('Error during file upload:', error);
            var snackbar = document.getElementById('snackbar');
            snackbar.innerHTML = 'Noget gik galt. Forkert fil-type eller ikke logget ind';
            snackbar.className = "show";
            setTimeout(function () {
                snackbar.className = snackbar.className.replace("show", "");
            }, 8000);
            throw error;
        });
}