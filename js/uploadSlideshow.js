// upload file to site
function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    var formData = new FormData();

    var snackbar = document.getElementById('snackbar')

    formData.append('file', file);

    var authToken = localStorage.getItem("authToken")

    if (!authToken){
        console.error('Error during file upload:', error);
        snackbar.innerHTML = 'Der skete en fejl. Denne bruger har muligvis ikke rettigheder til denne funktion';
        snackbar.className = "show";

        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
        }, 8000)
        return Promise.reject(new Error("No user authentication token found"));
    }


    fetch(`${API_BASE}/slideshow/uploadSlideshow`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        body: formData
    })
        .then(response => response.text())
        .then(message => {

            snackbar.innerHTML = message;
            snackbar.className = "show";

            setTimeout(function () {
                snackbar.className = snackbar.className.replace("show", "");
            }, 8000)

        })
        .catch(error => {
            console.error('Error during file upload:', error);
            snackbar.innerHTML = 'Error during file upload.';
            snackbar.className = "show";

            setTimeout(function () {
                snackbar.className = snackbar.className.replace("show", "");
            }, 8000)

        })
}


