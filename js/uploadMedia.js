// upload file to site
function uploadFile() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  var description = document.getElementById('descriptionInput').value;

  var formData = new FormData();
  formData.append('file', file);
  formData.append('description', description);

  var authToken = localStorage.getItem("authToken");

  if (!authToken) {
    console.error("No user authentication token found");
    return;
  }

  fetch(`${API_BASE}/media/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`, // Ensure the token is correctly formatted
    },
    mode: "cors",
    body: file
    //body: formData
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
        snackbar.innerHTML = 'Error during file upload.';
        snackbar.className = "show";
        setTimeout(function () {
          snackbar.className = snackbar.className.replace("show", "");
        }, 8000);
      });
}


