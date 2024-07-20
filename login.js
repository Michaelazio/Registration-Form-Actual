const loginForm = document.querySelector(".sign-in-form");
const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-pass");
const rememberMe = document.getElementById("remember-me");

let savedPassword = JSON.parse(localStorage.getItem("formData")).password;
console.log(savedPassword);

loginForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let getFormData = [...evt.target.elements]
    .filter((el) => el.type !== "submit" && el)
    .map((el) => {
      return {
        name: el.getAttribute("name"),
        type: el.type,
        value: el.value.trim(),
        required: el.required,
      };
    });
  console.log(getFormData);
  let isEmVal = getFormData
    .find((el) => el.name === "email")
    .value.split("")
    .includes("@");
  let passMatch = passwordRegEx.test(
    getFormData.find((el) => el.name === "password").value
  );
  let matchSavePassword =
    JSON.parse(window.localStorage.getItem("formData")).password ===
    getFormData.find((el) => el.name === "password").value;
});

function loginClick() {}
