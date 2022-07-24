let elForm = document.querySelector(".form");
let elPasswordInput = document.querySelector(".input-password");
let elEmailInput = document.querySelector(".input");
let elBtnEye = document.querySelector(".btn__eye");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let elPasswordInputVal = elPasswordInput.value.trim();
  let elEmailInputVal = elEmailInput.value.trim();

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: elPasswordInputVal,
      password: elEmailInputVal,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        location.replace("index.html");
      }
    });
});
