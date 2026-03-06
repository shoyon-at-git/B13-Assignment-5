// console.log("script loaded!!");

document.getElementById("sign-in-btn").addEventListener('click', function(){
    console.log("sign in button clicked");
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);
    //match the credentials
    if(username === "admin" && password === "admin123"){
        window.location.assign("issues-tracker.html");
    } else {
        alert("Invalid username or password. Please try again.");
    }
})