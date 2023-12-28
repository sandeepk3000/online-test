const createPaperForm = document.getElementById("createPaperForm")
function getQuestionFromForm(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    const [questionname] = [...form.getAll("questionname")]
    const [marks] = [...form.getAll("marks")]
    const options = [...form.getAll("option")]
    const correctoption = [...form.getAll("correctoption")]
    const question = {
        questionname: questionname,
        options: options,
        correctOption: parseInt(correctoption),
        marks: parseInt(marks)
    }
    uploadQuestions(question)
}
function uploadQuestions(question) {
    fetch(`/api/v1/paper/updateQuestionPaper?paperId=658b9589bbfbe29ef1483c7b`, {
        method: "PATCH",
        body: JSON.stringify(question),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((value) => {
            showQuestion([question])
        })
        .catch((error) => { });
}
async function createQuestionPaper(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const body = {}
    for (let i = 0; i < [...formData.entries()].length; i++) {
        const [key, value] = [...formData.entries()][i];
        body[key] = value;
    }
    fetch(`/api/v1/paper/createQuestionPaper?teacherId=658a55bb4326d290c1bb94c1`, {
        method: "POST",
        body: formData,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((value) => {
            createPaperWrapperInner(value.data.questions)
        })
        .catch((error) => { });
}

function createPaperWrapperInner(data) {
    const createPaperWrapperInner = ` <div class="col">
    <div class="row mt-4 " id="questionsWrapper">
   
    </div>

</div>
<div class="col p-4">
    <div class="col">
        <form id="submitQuestions">
            <div class="form-outline mb-4">
                <textarea class="form-control" id="questionname" name="questionname"  required rows="3"></textarea>
                <label class="form-label" for="questionname">Question</label>
            </div>
            <div class="form-outline mb-4">
                <input type="text" id="optionone" required name="option" class="form-control" />
                <label class="form-label" for="optionone">Option 1</label>
            </div>
            <div class="form-outline mb-4">
                <input type="text" id="optiontwo" required name="option" class="form-control" />
                <label class="form-label" for="optiontwo">Option 2</label>
            </div>
            <div class="form-outline mb-4">
                <input type="text" id="optionthree" required name="option" class="form-control" />
                <label class="form-label" for="optionthree">Option 3</label>
            </div>
            <!-- Email input -->
            <div class="form-outline mb-4">
                <input type="text" id="optionfour" required name="option" class="form-control" />
                <label class="form-label" for="optionfour">Option 4</label>
            </div>
            <div class="form-outline mb-4">
                <input type="number" id="correctoption" required name="correctoption" class="form-control" />
                <label class="form-label" for="correctoption">Correct Option</label>
            </div>
            <div class="form-outline mb-4">
                <input type="number" id="marks" required name="marks" class="form-control" />
                <label class="form-label" for="marks">Marks</label>
            </div>
            <div class="row align-items-center">
                <div class="col">
                    <button type="submit" class="btn btn-primary" id="saveQuestions">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>`
    const createPaperWrapper = document.querySelector(".createPaperWrapper")
    createPaperWrapper.innerHTML = createPaperWrapperInner
    showQuestion(data)
    const submitQuestions = document.getElementById("submitQuestions")
    submitQuestions.addEventListener("submit", getQuestionFromForm)
}
function showQuestion(questions) {
    if (questions.length === 0) {
        return
    }
    let questionWrapperInner = questions.map((question) => {
        console.log(question.question);
        return `<div class="col-12">
            <div class="Questions " style="border: 1px solid #dee2e6;">
                <ol class="list-group list-group-numbered ">
                    <li class="list-group-item d-flex border-0 justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">${question.question}</div>
                        </div>
                    </li>
                </ol>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOptions1">
                            <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#flush-collapseOptions1"
                                aria-expanded="false" aria-controls="flush-collapseOptions1">
                                Options
                            </button>
                        </h2>
                        <div id="flush-collapseOptions1" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingOptions1" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <ol class="list-group list-group-numbered">
                                ${question.options.map((option) => {
            return `<li class="list-group-item border-0">${option}</li>`
        }).join("")}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    })
    const questionsWrapper = document.getElementById("questionsWrapper")
    questionsWrapper.innerHTML += questionWrapperInner.join("")
}
async function isExistPaper(teacherId) {
    //getQuestionPaper
    fetch(`/api/v1/paper/getQuestionPaper?teacherId=${teacherId}`, {
        method: "GET"
    })
        .then((res) => res.ok ? res.json() : res.status)
        .then((value) => {
            console.log(value);
            if (value === 400) {
                createPaperForm.addEventListener("submit", createQuestionPaper)
                return
            } else {
                createPaperWrapperInner(value.data.questions)
            }
        })
}
isExistPaper("658a55bb4326d290c1bb94c1")