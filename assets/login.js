// login page
document.addEventListener('DOMContentLoaded', (event) => {
    const errorMessage = document.querySelector('.error-message');
    const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = loginForm.querySelector('input[type=email]').value;
    const password = loginForm.querySelector('input[type=password]').value;

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
        if (!response.ok) {
            // Si le statut de la réponse n'est pas dans la plage 200-299
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Une erreur est survenue');
            });
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Erreur:', error);
        errorMessage.textContent = error.message; 
        errorMessage.style.display = 'block';
    });
})});
