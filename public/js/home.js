const signupForm = document.getElementById("signupForm");
const signupFormOpenBtns = document.querySelectorAll(".signupFormOpenBtn");
let signupType = "";
signupFormOpenBtns.forEach((signupFormOpenBtn) => {
  signupFormOpenBtn.addEventListener("click", (event) => {
    console.log(event.target.value);
    signupType = event.target.value;
  });
});
signupForm.addEventListener("submit", formController);
function formController(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append("type", signupType)
  fetch(`/api/v1/${signupType}/register`, {
    method: "POST",
    body: formData
  })
    .then((res) => res.json())
    .then((value) => {
      if (value.success) {
        window.location.href = `/login`;
      }
    });
}
