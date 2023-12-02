// Function to handle form submission
function uploadUser(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form data
    const form = document.getElementById('create-user-form');
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirm-password').value;
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        // Display an error message or take appropriate action
        console.error('Passwords do not match');
        return;
    }

    // Get the file input element
    const fileInputElement = document.getElementById('profile-picture');

    // Check if a file is selected
    if (!fileInputElement.files || fileInputElement.files.length === 0) {
        console.error('No file selected');
        return;
    }

    // Get the title input value
    const title = form.querySelector('#title').value;

    // Extract the file type from the file name
    const fileType = fileInputElement.files[0].name.split('.').pop();

    // Create FormData and append file and user data
    const formData = new FormData();
    formData.append('file', fileInputElement.files[0]);
    formData.append('user', JSON.stringify({
        username: form.querySelector('#username').value,
        password: password,
        title: title,
        name: name,
        email: email,
        type: fileType,  // Add the type property
        // Add other user properties here
    }));

    // Make POST request
    fetch(API_BASE + '/addUser', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // You can adjust this based on your API response format
        })
        .then(data => {
            // Handle success
            console.log('User created successfully', data);
            // You can perform any additional actions here, such as redirecting to another page
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Attach the function to the form's submit event
document.getElementById('create-user-form').addEventListener('submit', uploadUser);
