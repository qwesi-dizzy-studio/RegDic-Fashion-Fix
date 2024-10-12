document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform basic validation
    if (username && password) {
        // Create an AJAX request to send data to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'signup.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (this.status === 200) {
                const response = this.responseText;
                if (response === 'success') {
                    document.getElementById('signupMessage').textContent = 'Successfully Created Account';
                    setTimeout(function() {
                        window.location.href = 'login.html'; // Redirect to login page after 2 seconds
                    }, 2000);
                } else {
                    document.getElementById('signupMessage').textContent = response;
                }
            }
        };

        xhr.send(`username=${username}&password=${password}`);
    } else {
        document.getElementById('signupMessage').textContent = 'Please fill in all fields.';
    }
});
