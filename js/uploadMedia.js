function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var description = document.getElementById('descriptionInput').value;

    var authToken = localStorage.getItem("authToken"); // Get the auth token from localStorage


    //var authToken = "Very invalid token"

    if (!authToken) {

        console.error("No user authentication token found");
        //return Promise.reject(new Error("No user authentication token found")); // Throw an error for fetch to catch
        var snackbar = document.getElementById('snackbar');
        snackbar.innerHTML = 'Den nuværende bruger har ikke adgang til fil-upload';
        snackbar.className = "show";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
        }, 8000);




        return Promise.reject(new Error("No user authentication token found")); // Throw an error for fetch to catch
    }

    var formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    return fetch(`${API_BASE}/media/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`, // Ensure the token is correctly formatted
        },
        mode: "cors",
        body: formData, // Use FormData to properly handle file uploads
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
        })
}