

document.getElementById('login-btn').addEventListener("click", function() {
    console.log('Login button clicked');
    
    const userInput = document.getElementById("user-input");
    const userName = userInput.value.trim();
    
    const passwordInput = document.getElementById("password-input");
    const password = passwordInput.value.trim();

    if (userName === '' || password === '') {
        alert(' Please fill all fields!');
        return;
    }

    if (userName === 'admin' && password === 'admin123') {
        alert('Login successful!');
        window.location.href = 'home.html';
    } else {
        alert('Invalid username or password!');
    }
});

