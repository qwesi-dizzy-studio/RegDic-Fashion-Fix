document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        fetch('/.netlify/functions/node', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                document.getElementById('signupMessage').textContent = 'Successfully Created Account';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                document.getElementById('signupMessage').textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('signupMessage').textContent = 'Something went wrong. Please try again.';
        });
    } else {
        document.getElementById('signupMessage').textContent = 'Please fill in all fields.';
    }
});
