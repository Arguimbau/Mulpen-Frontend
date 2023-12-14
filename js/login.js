function performLogin() {
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;

    var snackbar = document.getElementById("snackbar");

    var token

    const userData = {
        username: username,
        password: password
    };
    const apiUrl = "/login";

    console.log("Constructed URL:", API_BASE + apiUrl);

    fetch(API_BASE + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

                token = data.token

                console.log("User token: " + data.token)


                // Example: Fetching data from a protected endpoint
                fetch('/dashboard')
                    .then(response => response.json())
                    .then(data => {

                        console.log("Data from protected endpoint:", data);

                        // Handle the data as needed
                    })
                    .catch(error => console.error("Error fetching data:", error));

                // Redirect to the admin page (if needed)

                console.log("Token in localStorage before redirect:", localStorage.getItem("authToken"));
                setTimeout(() => {

                    window.location.href = '/dashboard';
                }, 1000)
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
