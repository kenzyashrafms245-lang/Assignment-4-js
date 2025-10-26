var nameInput = document.getElementById("Name");
var emailInput = document.getElementById("Email");
var passwordInput = document.getElementById("Pass");
var msg = document.getElementById("message");
var signUpBtn = document.getElementById("signupBtn");
var logoutBtn = document.getElementById("logoutBtn");

var users = JSON.parse(localStorage.getItem("users")) || [];


function validateName(Name) {
    return /^[a-zA-Z]{3,}$/.test(Name);
}

function validateEmail(Email) {
    return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email);
}

function validatePassword(Pass) {
    return /^.{4,}$/.test(Pass);
}

function isEmailExist(Email) {
    return users.some(user => user.Email === Email);
}


if (signUpBtn) {
    signUpBtn.addEventListener("click", function () {
        var name = nameInput.value.trim();
        var email = emailInput.value.trim();
        var password = passwordInput.value.trim();

        if (!validateName(name)) {
            msg.textContent = "Invalid Name (must be at least 3 letters)";
            msg.style.color = "red";
            return;
        }
        if (!validateEmail(email)) {
            msg.textContent = "Invalid Email Format";
            msg.style.color = "red";
            return;
        }
        if (!validatePassword(password)) {
            msg.textContent = "Password must be at least 4 characters";
            msg.style.color = "red";
            return;
        }
        if (isEmailExist(email)) {
            msg.textContent = "Email Already Exists";
            msg.style.color = "red";
            return;
        }

        
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify({ name, email }));

        msg.textContent = "Success";
        msg.style.color = "green";

        setTimeout(() => {
            window.location.href = "logIn.html";
        }, 1000);
    });
}


if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "signIn.html";
    });
}
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser && document.getElementById("userName")) {
  document.getElementById("userName").textContent = currentUser.name;
}