const loginForm = document.querySelector(".sign-in-form");
const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-pass");
const rememberMe = document.getElementById("remember-me");

// let savedPassword = JSON.parse(localStorage.getItem("formData")).password;
// console.log(savedPassword);

let canLogin = false;

console.log(rememberMe);

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
        checked: el.checked,
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
  
  let isAllowed = isEmVal && passMatch ? (canLogin = true) : (canLogin = false);
  if (isAllowed) {
    let loginData = {};
    if (getFormData.find((obj) => obj.type === "checkbox").checked === true) {
      loginData = {
        email: getFormData.find((el) => el.type === "email").value,
        password: getFormData.find((el) => el.name === "password").value,
        checked: getFormData.find(el => el.type === 'checkbox').checked
      };
      localStorage.setItem("loginData", JSON.stringify(loginData));
    }
    return alert(`You can Successfuly login`);
  } else {
    return alert(`oops!! credential's didn't match`);
  }
});

(()=>{
  let isChecked = JSON.parse(localStorage.getItem('loginData')).checked; 
  

    if(isChecked){
      loginEmail.value = JSON.parse(localStorage.getItem('loginData')).email;
      loginPass.value = JSON.parse(localStorage.getItem('loginData')).password
      rememberMe.checked = true
    }


})()
