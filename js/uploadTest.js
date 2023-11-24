// upload file to site
function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var description = document.getElementById('descriptionInput').value;

    var formData = new FormData();

    var snackbar = document.getElementById('snackbar')

    formData.append('file', file);
    formData.append('description', description);

    fetch('http://localhost:8080/media/upload', {
        method: 'POST',
        mode: 'cors',
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


