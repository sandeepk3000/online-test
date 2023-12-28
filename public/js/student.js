
const joinTestForm = document.getElementById("joinTestForm")
const socket = io("/test")
joinTestForm.addEventListener("submit", getTestId)
function getTestId(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    const [testId] = [...form.getAll("testid")];
    joinTest(testId)
}
async function joinTest(testId) {
    fetch(`/api/v1/test/updateTest?action=join&&testId=${testId}`, {
        method: "PATCH",
        body: JSON.stringify({ studentId: studentId }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((value) => {
            if (value.success) {
                window.location.href = `/testDashboard?studentId=${"65842e8a02108e4ff61276a3"}`
            }
        })
        .catch((error) => { });

}
