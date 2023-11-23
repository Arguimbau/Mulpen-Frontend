function submitForm(){
    var formData = new FormData(document.getElementById("postForm"));

    fetch('http://localhost:8080/create-post', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                console.log('Success:', data)
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
}
