const login = "http://localhost:8080/login";
function performLogin() {
    const email = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;

    const userData = {
        username: email,
        password: password
    };

    fetch(login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Store the token securely, for example in localStorage
                localStorage.setItem("authToken", data.token);
                console.log("Login successful");
                window.location.href = "dashboard.html";
            } else {
                console.error("Login failed, Please try again");
            }
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

const loginButton = document.getElementById("login-btn");
loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    performLogin();
});

