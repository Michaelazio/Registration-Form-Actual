const signUpForm = document.querySelector(".sign-up-form");
const userName = document.getElementById("username");
const email = document.getElementById("sign-email");
const password = document.getElementById("sign-pass");
const reTypePass = document.getElementById("repass");
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm;

let canSubmit = false;

function submitForm(data) {
  console.log(data);
  //From here the data gets sent to an endpoint but I shall store it to the Browser's local Storage
  let formObj ={};
  data.forEach(obj => formObj[obj.name] = obj.value); 
  console.log(formObj)
  return window.localStorage.setItem('formData', JSON.stringify(formObj))
}

signUpForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const getFormValues = Array.from(evt.target.elements).filter(
    (el) => el.type !== "submit" && el
  );
  const formValues = getFormValues.map(({ name, type, value, required }) => ({
    name,
    type,
    value: value.trim(),
    required,
  }));
  console.log(formValues);

  const isFilled = formValues.every(
    ({ value, required }) => !required || value !== ""
  );
  console.log(isFilled);

  //Validation Check is Performed here
  let isEmVal = formValues.find(el => el.name === 'email').value.split("").includes("@");
  console.log(isEmVal);
  let isMatched = formValues.find(el => el.name === "repassword").value === formValues.find(el => el.name === "password").value
  console.log(isMatched);
  let passMatch = passwordRegEx.test(formValues.find(el => el.name === "password").value);
  console.log(passMatch);
  let isValidated = isMatched && isEmVal ? canSubmit = true : canSubmit = false; 
  console.log(isValidated);

  if(isFilled &&isValidated && passMatch){
    submitForm(formValues);
    return alert(`Form Submitted`)
  } else {
    return alert(`Incorrect Credentials`)
  }
});

//For emergency cleaning required of the formdata then ->
// function removeFormData(){
//   window.localStorage.clear()
// }
// removeFormData();