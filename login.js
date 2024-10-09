document.getElementById('role').addEventListener('change', function() {
  const role = document.getElementById('role').value;
  const usernameGroup = document.getElementById('usernameGroup');
  const passwordLabel = document.getElementById('passwordLabel');
  if (role === 'admin') {
    usernameGroup.style.display = 'none';
    passwordLabel.textContent = 'Type unique code';
  } else {
    usernameGroup.style.display = 'block';
    passwordLabel.textContent = 'Password';
  }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const role = document.getElementById('role').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, username, password })
  });
  const data = await response.json();
  if (data.success) {
    window.location.href = data.redirect;
  } else {
    document.getElementById('loginMessage').textContent = data.message;
  }
});
