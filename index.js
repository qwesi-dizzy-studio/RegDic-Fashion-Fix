document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const role = document.getElementById('role').value;
  const password = document.getElementById('password').value;
  const username = role === 'user' ? document.getElementById('username').value : '';

  // Send login data to Netlify function
  const response = await fetch('/.netlify/functions/index.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role, username, password })
  });

  const data = await response.json();
  if (data.success) {
    window.location.href = data.redirect;
  } else {
    document.getElementById('loginMessage').textContent = data.message;
  }
});
