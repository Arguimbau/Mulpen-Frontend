const login = "http://localhost:8080/login";

function performLogin() {
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;

    var snackbar = document.getElementById("snackbar");

    const userData = {
        username: username,
        password: password
    };

    fetch(login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {

                /*
                snackbar.innerHTML = "Forkerte login oplysninger"
                snackbar.className = "show"

                 */
                snackbar.innerHTML = "Log-ind oplysninger forkert"
                snackbar.className = "show";

                setTimeout(function () {
                    snackbar.className = snackbar.className.replace("show", "");
                }, 8000)

                // Handle HTTP error status (e.g., 401 for unauthorized)
                console.error("Login failed, Please try again");

                return Promise.reject("Bad credentials");
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                // Store the token securely, for example in localStorage

                localStorage.setItem("authToken", data.token);
                console.log("Login successful");
                window.location.href = "dashboard.html";
            } else {
                console.error("Login failed, Please try again");
                // Add code to handle failed login, e.g., display an error message
            }
        })
        .catch(error => {
            console.error("An error occurred:", error);
            // Add code to handle other errors, if needed
        });
}

const loginButton = document.getElementById("login-btn");
loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    performLogin();
});
