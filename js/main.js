//questions array
const QUESTIONS = [
  { question: "Enter your first name" },
  { question: "Enter your last name" },
  { question: "Enter your email", pattern: /\S+@\S+\.\S+/ },
  { question: "Create a password", type: "password" }
];

//transition times
const SHAKE_TIME = 100; //shake transition time
const SWITCH_TIME = 200; //transition between questions

//1st position value
let position = 0;

//initialize DOM elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progressBar = document.querySelector("#progress-bar");

//events

//get question on DOM load
document.addEventListener("DOMContentLoaded", getQuestion);

//next btn click
nextBtn.addEventListener("click", validate);

//input field enter press
inputField.addEventListener("keyup", evt => {
  if (evt.keyCode == 13) {
    validate();
  }
});

//functions

function getQuestion() {
  inputLabel.innerHTML = QUESTIONS[position].question;

  inputField.type = QUESTIONS[position].type || "text";

  //get current answer
  inputField.value = QUESTIONS[position].answer || "";

  //focus on element
  inputField.focus();

  //progress bar
  progressBar.style.width = (position * 100) / QUESTIONS.length + "%";

  //add user icon or back arrow depending on question
  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

//display question
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

//hide question
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
  inputGroup.style.border = "none";
}

//function to create shake motion
function transform(x, y) {
  console.log(x, y);
  formBox.style.transform = `translate(${x}px,${y}px)`;
}

//validate
function validate() {
  //make sure pattern matches if there is one
  if (!inputField.value.match(QUESTIONS[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

//input fail
function inputFail() {
  formBox.className = "error";
  //repeat shake motion
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, SHAKE_TIME * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, SHAKE_TIME * 6, 0, 0);
    inputField.focus();
  }
}

//input pass
function inputPass() {
  formBox.className = "";
  setTimeout(transform, SHAKE_TIME * 0, 0, 10);
  setTimeout(transform, SHAKE_TIME * 1, 0, 0);

  QUESTIONS[position].answer = inputField.value;

  //increment array position
  position++;

  //if new question, hide current and get next
  if (QUESTIONS[position]) {
    hideQuestion();
    getQuestion();
  } else {
    //remove if no more questions
    hideQuestion();
    formBox.className = "close";
    progressBar.style.width = "100%";
    formComplete();
  }
}

//all fields complete show h1
function formComplete() {
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.style.color = "#fff";
  h1.appendChild(
    document.createTextNode(
      `Thanks ${QUESTIONS[0].answer}. We will send you an email shortly.`
    )
  );

  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => {
      h1.style.opacity = 1;
    }, 50);
  }, 1000);
}
