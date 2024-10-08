document.getElementById('role').addEventListener('change', function() {
    const role = document.getElementById('role').value;
    const usernameGroup = document.getElementById('usernameGroup');
    const passwordLabel = document.getElementById('passwordLabel');

    if (role === 'admin') {
        // Hide username field for admin and change password label to "Type unique code"
        usernameGroup.style.display = 'none';
        passwordLabel.textContent = 'Type unique code';
    } else {
        // Show username field for user and revert the password label back to "Password"
        usernameGroup.style.display = 'block';
        passwordLabel.textContent = 'Password';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;

    if (role === 'user') {
        const username = document.getElementById('username').value;

        // Fetch user data from localStorage (simulate backend)
        const users = JSON.parse(localStorage.getItem('user_db')) || [];
        const user = users.find(u => u.username === username && u.password === password && u.role === 'user');

        if (user) {
            window.location.href = 'userpage.html'; // Redirect to user dashboard
        } else {
            document.getElementById('loginMessage').textContent = 'Invalid login credentials!';
        }
    } else if (role === 'admin') {
        const adminCode = 'pRGnS611';
        if (password === adminCode) {
            window.location.href = 'admin_dashboard.html'; // Redirect to admin dashboard
        } else {
            document.getElementById('loginMessage').textContent = 'Invalid admin code!';
        }
    }
});
