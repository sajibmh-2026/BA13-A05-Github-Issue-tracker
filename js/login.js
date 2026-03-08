console.log('hello world')

document.getElementById('signup-btn').addEventListener("click", function(){
    console.log('login button clicked')
    const userInput = document.getElementById("user-input");
    const userName = userInput.value
    const passwordInput = document.getElementById("password-input");
    const password = passwordInput.value;

    if(userName === 'admin' && password === "admin123"){
        alert('login successful!!!')
        window.location.assign("home.html")
    }
    else{
        alert('user not match..!')
        return;
    }


    
})