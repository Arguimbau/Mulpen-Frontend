console.log('API_BASE:', API_BASE);

fetch(`${API_BASE}/allUsers`, {
    method: 'GET',
    mode: 'cors',
})
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(users => {
        console.log('Fetched users:', users);

        // Reference to the select element
        const selectElement = $("select");

        // Clear existing options
        selectElement.empty();

        // Add a default option
        selectElement.append("<option value=''>Vælg bruger</option>");

        // Iterate through users and add them as options
        users.forEach(user => {
            selectElement.append(`<option value="${user.id}">${user.name}</option>`);
        });

        console.log('Options added to select element:', selectElement);
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
// Event listener for the delete-user button
$("#delete-user").on("click", function () {
    // Retrieve the selected user ID from the select element
    const selectedUserId = $("select").val();

    // Ensure a user is selected before sending the request
    if (!selectedUserId) {
        console.log("Please select a user before deleting.");
        return;
    }

    // Create an object with the user ID
    const requestData = {
        userId: selectedUserId
    };
    console.log('API_BASE:', API_BASE);

    console.log('Request Data:', requestData);

    // Fetch to delete user from the backend
    fetch(`${API_BASE}/deleteUser`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(requestData),
    })
        .then(response => {
            console.log('Response status:', response.status);

            // Check if the response status is OK (200)
            if (response.ok) {
                // Check if the response contains JSON content
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json(); // Parse JSON if present
                } else {
                    return {}; // Return an empty object for non-JSON responses
                }
            } else {
                // Handle non-OK response status
                throw new Error(`Error: ${response.status}`);
            }
        })

        .then(result => {
            console.log('Delete user result:', result);
            location.reload();
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
});

