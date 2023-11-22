document.addEventListener('DOMContentLoaded', function(){
    var postsList = document.getElementById('postsList');

    fetch('http://localhost:8080/posts')
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                var li = document.createElement('li');
                li.textContent = post.text;
                postsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error)
        })
})