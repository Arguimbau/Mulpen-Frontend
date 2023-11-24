function uploadFile(){
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(message => {
            document.getElementById('uploadStatus').innerHTML = message;
        })
        .catch(error => {
            console.error('Error during file upload:', error);
            document.getElementById('uploadStatus').innerHTML = 'Error during file upload.';
        })
}