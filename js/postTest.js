function submitForm(){
    var formData = new FormData(document.getElementById("postForm"))

    fetch('http://localhost:8080/create-post', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = '/posts.html';
        })
        .catch(error => {
            console.error('Error', error);
        });
}