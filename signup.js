document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Store user data in localStorage (simulate backend)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('signupMessage').textContent = 'Sign-Up successful!';
});
