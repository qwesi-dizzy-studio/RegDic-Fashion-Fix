// Get necessary elements
const roleSelect = document.getElementById('role');
const adminCodeGroup = document.getElementById('adminCodeGroup');

// Show/Hide the admin unique code field based on the role selection
roleSelect.addEventListener('change', function() {
    if (roleSelect.value === 'admin') {
        adminCodeGroup.style.display = 'block';
    } else {
        adminCodeGroup.style.display = 'none';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const loginMessage = document.getElementById('loginMessage');

    // List of valid user credentials
    const validUsers = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' }
    ];

    // Admin credentials
    const adminUniqueCode = 'pRGnS611';
    const adminCodeInput = document.getElementById('adminCode').value;

    if (role === 'user') {
        // User login validation
        const user = validUsers.find(user => user.username === username);

        if (!user) {
            loginMessage.textContent = "Account does not exist, create new account";
            loginMessage.style.color = "red";
        } else if (user.password !== password) {
            loginMessage.textContent = "Invalid login credentials";
            loginMessage.style.color = "red";
        } else {
            // Redirect to user page
            window.location.href = 'userpage.html';
        }
    } else if (role === 'admin') {
        // Admin login validation
        if (adminCodeInput !== adminUniqueCode) {
            loginMessage.textContent = "Wrong unique code";
            loginMessage.style.color = "red";
        } else {
            // Redirect to admin dashboard
            window.location.href = 'admin_dashboard.html';
        }
    }
});
