document.addEventListener('DOMContentLoaded', function () {

    window.onload = function () {
    getUsers();
};

function getUsers() {
    fetch('/allUsers')
        .then(response => response.json())
        .then(data => {
            const dynamicMembers = document.getElementById('dynamicMembers');
            data.forEach(user => {
                if (user.username !== "admin") {
                    const userElement = document.createElement('li');
                    userElement.classList.add(`profile-${user.username}`);
                    userElement.innerHTML = `
                        <div class="profilePicture">
                            <img src="${user.filePath}" alt="Profile image">
                        </div>
                        <div>
                        <style>
                        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
                        </style>
                        <strong style="font-family: 'run', sans-serif;">${user.name}</strong>
                        <br>
                        <strong style="font-family: 'Poppins', sans-serif;">${user.title}</strong>
                        <br>
                        <strong style="font-family: 'Poppins', sans-serif;">${user.phoneNumber}</strong>
                        <br>
                        <a style="font-family: 'Poppins', sans-serif;" href="mailto:${user.email}">${user.email}</a>
                        </div>
                    `;
                    dynamicMembers.appendChild(userElement);

                    // Set user data as a data attribute
                    userElement.setAttribute('data-user', JSON.stringify(user));
                }
            });

            addHoverEffects(); // Call the function to add hover effects
        })
        .catch(error => console.error('Error fetching data:', error));
}

    function addHoverEffects() {
        const members = document.querySelectorAll('.members li');
        const silhouetteImages = {};

        members.forEach(member => {
            const username = member.classList[0].replace('profile-', '');
            const silhouetteImage = new Image();
            silhouetteImage.src = `images/silhouettes/${username}_silhuet.png`;
            silhouetteImages[username] = silhouetteImage;
        });

        members.forEach(member => {
            const profilePicture = member.querySelector('.profilePicture img');
            const username = member.classList[0].replace('profile-', '');

            member.addEventListener('mouseenter', () => {
                profilePicture.src = silhouetteImages[username].src;
            });

            member.addEventListener('mouseleave', () => {
                const userData = JSON.parse(member.getAttribute('data-user'));
                // Change back to the original picture without a timeout
                profilePicture.src = `${userData.filePath}`;
            });
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
});


