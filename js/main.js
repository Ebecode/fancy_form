//questions array
const QUESTIONS = [
  { question: "Enter your first name" },
  { question: "Enter your last name" },
  { question: "Enter your email", pattern: /\S+A\S+\.\s+/ },
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
document.addEventListener("DOMContentLoaded", getQuestion);

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
