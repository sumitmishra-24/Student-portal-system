const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === "" || password === "") {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    message.textContent =
        "Form submitted successfully! Login functionality will be added later.";
    message.style.color = "green";
});

document.getElementById("signup-link").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Signup page will be created soon!");
});

document.getElementById("forgot-password").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Password recovery will be added soon!");
});
