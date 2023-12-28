const loginForm = document.getElementById("loginForm");
// const redirectString = new URLSearchParams(window.location.search);
const loginBtn = document.querySelector("#loginBtn");
loginForm.addEventListener("submit", async function doLogin(event) {
    event.preventDefault();
    // addBtnSpinner(loginBtn);
    const formData = new FormData(event.target);
    const body = {};
    for (let i = 0; i < [...formData.entries()].length; i++) {
        const [key, value] = [...formData.entries()][i];
        body[key] = value;
    }
    fetch(`/api/v1/teacher/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (respsoe) {
            return respsoe.json();
        })
        .then((value) => {
            console.log(value);
        })
        .catch(function (erro) {
            console.log(erro);
        });
});
