// Get necessary elements
const roleSelect = document.getElementById('role');
const adminCodeGroup = document.getElementById('adminCodeGroup');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// List of valid user credentials
const validUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Admin credentials
const adminUniqueCode = 'pRGnS611';

roleSelect.addEventListener('change', () => {
    if (roleSelect.value === 'admin') {
        // Hide username and password inputs completely
        usernameGroup.style.display = 'none';
        usernameInput.style.display = 'none';
        passwordLabel.style.display = 'none';
        passwordInput.style.display = 'none';
        adminCodeGroup.style.display = 'block';
    } else {
        // Show username and password inputs
        usernameInput.style.display = 'block';
        passwordInput.style.display = 'block';
        adminCodeGroup.style.display = 'none';
    }
});

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const role = roleSelect.value;
    const adminCodeInput = document.getElementById('adminCode').value;

    if (role === 'user') {
        handleUserLogin(username, password);
    } else if (role === 'admin') {
        handleAdminLogin(adminCodeInput);
    }
});

function handleUserLogin(username, password) {
    const user = validUsers.find(user => user.username === username);
    if (!user) {
        displayMessage("Account does not exist, create new account", "red");
    } else if (user.password !== password) {
        displayMessage("Invalid login credentials", "red");
    } else {
        window.location.href = 'userpage.html';
    }
}

function handleAdminLogin(adminCodeInput) {
    if (adminCodeInput !== adminUniqueCode) {
        displayMessage("Wrong unique code", "red");
    } else {
        window.location.href = 'admin_dashboard.html';
    }
}

function displayMessage(message, color) {
    loginMessage.textContent = message;
    loginMessage.style.color = color;
    setTimeout(() => loginMessage.textContent = '', 3000); // Clear message after 3 seconds
}


