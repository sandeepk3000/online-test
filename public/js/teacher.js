// const createTestForm = document.getElementById("createTestForm");
const socket = io("/test")
socket.emit("connectToSocket", "65755fe38f43b80195480685")
createTestForm.addEventListener("submit", getTestDetails);
function getTestDetails(event) {
  event.preventDefault();
  let body = {};
  const form = new FormData(event.target);
  for (let i = 0; i < [...form.entries()].length; i++) {
    const [key, value] = [...form.entries()][i];
    body[key] = value;
  }
  createTest(body);
}
console.log("teacher");
function createTest(body) {
  fetch(`/api/v1/test/createTest?teacherId=658a55bb4326d290c1bb94c1`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((value) => {
      console.log(value);
    })
    .catch((error) => { });
}

socket.on("joined", (joinData) => {
  console.log(joinData);
})
socket.on("submit", (submitData) => {
  console.log(submitData);
})
socket.on("exit", (exitData) => {
  console.log(exitData);
})
socket.on("help", (helpData) => {
  console.log(helpData);
})

function teacherUpdateTest(updateData) {
  fetch(`/api/v1/test/getTest?action=${updateData.action}&&testId=${updateData.testId}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((value) => {
      if (value.data === "start") {
        const testUpdateInfo = {
          action: "teststart",
          data: null,
          testId: updateData.testId,
        }
        socket.emit("teacherUpdateTest", testUpdateInfo)
      }
    })
    .catch((error) => { });
}