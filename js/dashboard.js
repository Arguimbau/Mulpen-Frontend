document.addEventListener('DOMContentLoaded', function () {
    // Load header and footer
    $("#header-placeholder").load("/objects/adminHeader.html");
    $("#footer-placeholder").load("/objects/footer.html");

    document.addEventListener('click', function (event) {
        if (event.target.id === 'logout') {
            console.log("Logout button clicked");
            logout();
        }
    });

    // Rest of your code
    document.getElementById("upload").addEventListener("click", function () {
        window.location.href = "uploadMedia.html"
    });
    document.getElementById("delete").addEventListener("click", function () {
        window.location.href = "delete.html"
    });

    document.getElementById("create-user").addEventListener("click", function () {
        window.location.href = "createUser.html"
    });

    document.getElementById("delete-user").addEventListener("click", function () {
        window.location.href = "deleteUser.html"
    });
});

function logout() {
    console.log("Logout function called");
    // Perform the logout action
    fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        },
    })
        .then(response => {
            if (response.ok) {
                console.log('Logout successful');
                window.location.href = 'index.html';
            } else {
                console.error('Logout failed');
                alert('Logout failed. Please try again.');

            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
            // Handle errors (optional)
        });
}
