const widgetWrap = document.querySelector(".widget-wrap")
const socket = io("/test")
socket.emit("connectToSocket", "65755fe38f43b80195480685")
const yourTest = []
let timer;
function getTest() {
    fetch(`/api/v1/test/getTest?testId=65755fe38f43b80195480685&&studentId=65842e8a02108e4ff61276a3`)
        .then((res) => res.json())
        .then((test) => {
            if (test.success && test.data.status !== "start") {
                studentUpdateTest({
                    action: "joined",
                    data: null,
                    testId: "65755fe38f43b80195480685",
                    studentId: "65842e8a02108e4ff61276a3"
                })
                console.log(test);
                startTimer("12 25 2023 09:13 AM", updateTimer, getTest)
            } else if (test.success && test.data.status === "start") {
                getPaper(test.data.questionPaper)
                // return
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

getTest()
function updateTimer(timeDiff, setOn) {
    const days = Math.floor(timeDiff / (60 * 60 * 24))
    const hours = Math.floor(timeDiff % (60 * 60 * 24) / (60 * 60))
    const minutes = Math.floor(timeDiff % (60 * 60) / 60)
    const seconds = Math.floor(timeDiff % 60)
    setOn.textContent = `${days}:${hours}:${minutes}:${seconds}`
    // console.log(days, hours, minutes, seconds);
}
function getPaper(paperId) {
    fetch(`/api/v1/paper/getQuestionPaper?paperId=${paperId}`)
        .then((res) => res.json())
        .then((paper) => {
            console.log(paper);
            if (paper.success) {
                showQuestions(paper.data)
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
const createQuestion = (question, id) => {
    const questionWrap = document.createElement("div");
    questionWrap.setAttribute("id", `${id}`)
    questionWrap.classList.add("questionWrap")
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("quizQn" + id)
    questionDiv.textContent = question.question
    questionWrap.appendChild(questionDiv);
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("quizAns")
    for (let i = 0; i < question.options.length; i++) {
        let radio = document.createElement("input");
        radio.setAttribute("type", "radio")
        radio.setAttribute("name", "quiz")
        radio.setAttribute("id", "quizo" + i)
        answersDiv.appendChild(radio);
        let label = document.createElement("label");
        label.textContent = question.options[i]
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", testController);
        answersDiv.appendChild(label);
    }
    questionWrap.appendChild(answersDiv)
    const questionWrapHtml = questionWrap
    console.log(questionWrapHtml);
    return questionWrapHtml

}
function startTimer(startDate, updateTimer, setOn, done) {
    const setter = document.querySelector(`.${setOn}`)
    console.log("return timer");
    const startOn = new Date(startDate)
    timer = setInterval(() => {
        const current = new Date()
        const timeDiff = (startOn - current) / 1000
        if (timeDiff < 0) {
            stopTimer(done)
            return;
        }
        console.log("starttimer");
        updateTimer(timeDiff, setter)
    }, 1000)
}
function stopTimer(done) {
    clearTimeout(timer)
    done()
}

function startTest() {
    showQuestions(questions)
}
function showQuestions({ questions, subject }) {
    console.log(questions);
    for (let i = 0; i < questions.length; i++) {
        const questionDiv = createQuestion(questions[i], questions[i]._id)
        const indicators = document.getElementById("indicators")
        const questionsWrap = document.getElementById("questionsWrap");
        const indicatorsBtn = document.createElement("button")
        indicatorsBtn.setAttribute("type", "button")
        indicatorsBtn.setAttribute("data-bs-target", "#carouselQuestionsWrap")
        indicatorsBtn.setAttribute("data-bs-slide-to", `${i}`)
        indicatorsBtn.setAttribute("aria-current", "true")
        indicatorsBtn.setAttribute("aria-label", `Slide ${i + 1}`)
        const carouselItemDiv = document.createElement("div");
        carouselItemDiv.classList.add("carousel-item")
        if (i == 0) {
            carouselItemDiv.classList.add("active")
            indicatorsBtn.classList.add("active")
        }
        carouselItemDiv.appendChild(questionDiv)
        indicators.appendChild(indicatorsBtn)
        questionsWrap.appendChild(carouselItemDiv)
    }
    const testEstimation = document.querySelector(".testEstimation")
    const estimateSpans = `<span class="mx-2"><span id="answer" class="badge rounded-pill mar bg-success mx-1">0</span>Answered</span>
                <span class="mx-2"><span id="notAnswer" class="badge rounded-pill mar bg-danger mx-1">${questions.length}</span> Not Answered</span>`
    testEstimation.innerHTML = estimateSpans
    const btnsWrapper = document.querySelector(".btnsWrapper")
    const submitBtn = document.createElement("button")
    submitBtn.classList.add("btn", "btn-primary", "submitTest", "w-50", "m-auto")
    submitBtn.textContent = "Submit"
    submitBtn.addEventListener("click", (event) => {
        sumbitTest("65755fe38f43b80195480685", "65842e8a02108e4ff61276a3", yourTest, questions)
    })
    btnsWrapper.appendChild(submitBtn)
    const testHeader = document.querySelector(".testHeader")
    for (let i = 1; i <= 3; i++) {
        const headerInnerDiv = document.createElement("div")
        headerInnerDiv.classList.add("col")
        const headerInnerSpan = document.createElement("span")
        headerInnerSpan.textContent = "hello"
        if (i === 2) {
            headerInnerSpan.textContent = `Subject:${subject}`
        }
        else if (i === 3) {
            headerInnerSpan.classList.add("remainingTimer")
        }
        headerInnerDiv.appendChild(headerInnerSpan)
        testHeader.appendChild(headerInnerDiv)
    }

    startTimer("12 25 2023 09:14 AM", updateTimer, "remainingTimer", closeTest)
}


function sumbitTest(testId, studentId, yourTest, questions) {
    const maxMark = questions.reduce((current, question) => question.marks + current, 0)
    let obtainedMark = 0
    yourTest.reduce((current, yourtest) => {
        console.log(current);
        console.log(yourtest);
        const match = current.find((question) => (yourtest.questionId === question._id) && (question.correctOption === yourtest.yourAns))
        if (match) {
            obtainedMark += match.marks
        }
        else if (!match) {
            obtainedMark--
        }
        return questions
    }, questions)
    console.log(maxMark, obtainedMark);
    fetch(`/api/v1/result/createResult?testId=${testId}&&studentId=${studentId}`, {
        method: "POST",
        body: JSON.stringify({
            obtainedMark: obtainedMark,
            maxMark: maxMark
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((result) => {
            if (result.success) {
                studentUpdateTest({
                    action: "submit",
                    data: null,
                    testId: testId,
                    studentId: studentId
                })
            }
            console.log(result);
            stopTimer(closeTest)
        })
        .catch((error) => {
            console.log(error);
        });
}
function closeTest() {
    document.body.innerHTML = "finished exam"
}
function testController(event) {
    const answerCountSpan = document.querySelector("#answer")
    const notAnswerCountSpan = document.querySelector("#notAnswer")
    const youAns = {
        questionId: event.target.closest(".questionWrap").getAttribute("id"),
        yourAns: parseInt(event.target.getAttribute("data-idx"))
    }
    const quizAns = event.target.closest(".quizAns");
    const all = quizAns.getElementsByTagName("label")
    for (let label of all) {
        label.classList.remove("correct")
    }
    event.target.classList.add("correct")
    const match = yourTest.find((yourtest) => yourtest.questionId === event.target.closest(".questionWrap").getAttribute("id"))
    if (!match) {
        yourTest.push(youAns)
        const notAnswerCount = parseInt(notAnswerCountSpan.textContent)
        answerCountSpan.textContent = yourTest.length
        notAnswerCountSpan.textContent = (notAnswerCount - yourTest.length) < 0 ? "0" : (notAnswerCount - yourTest.length);
        console.log(yourTest);
    } else {
        const indexToReplace = yourTest.indexOf(match)
        yourTest[indexToReplace] = youAns

        console.log(yourTest);
    }
}

function studentUpdateTest(updateData) {
    if (!updateData) return;
    socket.emit("studentUpdateTest", updateData)
}

socket.on("teacherUpdateTest", (updateData) => {
    if (updateData.action === "teststart") {
        stopTimer(getTest)
        console.log(updateData);
    }
})
