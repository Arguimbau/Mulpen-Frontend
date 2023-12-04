window.onload = function getUsers() {
    fetch('/allUsers')
        .then(response => response.json())
        .then(data => {
            const dynamicMembers = document.getElementById('dynamicMembers');
            data.forEach(user => {
                if(user.username !== "admin")   {
                const userElement = document.createElement('li');
                userElement.innerHTML = `
                    <div class="profilePicture">
                        <img src="${user.filePath}" alt="Profile image">
                    </div>
                    <div>
                        <strong>${user.name}</strong>
                        <br>
                        ${user.title}
                        <br>
                        <strong>${user.phoneNumber}</strong>
                        <br>
                        <a href="mailto:${user.email}">${user.email}</a>
                    </div>
                `;
                dynamicMembers.appendChild(userElement);
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    loadHTML('/objects/header.html', 'header-placeholder');
    loadHTML('/objects/footer.html', 'footer-placeholder');
});
}

function loadHTML(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading HTML from ${url}:`, error));
}


