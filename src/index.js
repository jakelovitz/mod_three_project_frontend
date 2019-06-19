document.addEventListener('DOMContentLoaded', () => {
  console.log("%c Easy Day",
    "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)");

const dataURL = "http://localhost:3000/api/v1/people"
const defaultPic = "https://i.imgur.com/USOQOCa.png"
const medicCon = document.getElementById("medicCon")
let personsArr = []

getWounds()

function getWounds(){
  fetch(dataURL)
    .then(response => response.json())
    .then(data => data.forEach(x => personsArr.push(x)))
    console.log(personsArr)
}

document.querySelector("#start").addEventListener("click", e => {
  e.target.style.display = "none"

  woundGen() // this is what triggers the actual quiz bit
})

function woundGen(){
  person = personsArr[Math.floor(Math.random() * personsArr.length)]
  wound  = person.wounds[Math.floor(Math.random() * person.wounds.length)]
  treatments = wound.treatments
  woundPic =  wound.img_url
  console.log(person)
  console.log(wound)
  console.log(treatments)
  console.log(woundPic)
  console.log(wound.location)


  switch(wound.location){
    case "left arm":
        injury = document.querySelector("#leftArm")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "right arm":
        injury = document.querySelector("#rightArm")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "left leg":
        injury = document.querySelector("#leftLeg")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "right leg":
        injury = document.querySelector("#rightLeg")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "body":
        injury = document.querySelector("#body")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "head":
        injury = document.querySelector("#head")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
    }
}

function setWoundPic(woundPic){
  document.querySelector("#backdrop").innerHTML =
  `
    <img class="center" src=${woundPic} style="height: 500px"> </img>
  `
}


function displayWound(wound, injury){
  injury.style.display = "block"
  woundDisplay = document.createElement('div')
  woundDisplay.innerHTML =
    `
    <div>
      <div id="bodypart${injury.id}">
        ${wound.name}
        <br>
        <br>
        ${wound.description}
        <div id="quiz"></div>
        <button id="createQuizsubmit">Treat wound</button>
        <div id="results"></div>
      </div>
    </div>
    `
  medicCon.appendChild(woundDisplay)
  document.querySelector("#createQuizsubmit").onclick = function(){
  createQuiz()
  }
}


function createQuiz(){
  let quizContainer = document.getElementById('quiz')
  let resultsContainer = document.getElementById('results')
  let submitAnswersButton = document.getElementById('submit')
  generateQuiz(quizContainer, resultsContainer, submitAnswersButton)
}

function generateQuiz(quizContainer, resultsContainer, submitAnswersButton){
// debugger
//get questions list
var questions = dynamicGenerateQuestions(treatments);
// show the questions
showQuestions(questions, quizContainer);
// when user clicks submit, show results
submitAnswersButton.onclick = function(){
  showResults(questions, quizContainer, resultsContainer);
}
}

function getAnswers(treatments) {
let answers = {};
  for (var i = 0; i < treatments.length; i++) {
    answers[String.fromCharCode(97 + i)] = `${treatments[i].action}`
  };
return answers
}
function shuffle(array) {
var currentIndex = array.length, temporaryValue, randomIndex;
// While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

return array;
}

function dynamicGenerateQuestions(treatments) {
questions = []
answers = getAnswers(treatments)
  for (var i = 0; i < treatments.length; i++) {
    question =  {
      question: `What is step ${i + 1}?`,
      answers,
      correctAnswer: `${String.fromCharCode(97 + (treatments[i].order) - 1)}`
    }
    questions.push(question)
  }
return shuffle(questions)
}

function showQuestions(questions, quizContainer){
let output = [];
let answers;
  for (var i = 0; i < questions.length; i++) {
    answers = [];
    for(letter in questions[i].answers){
    answers.push(
        '<label>'
        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
        + letter + ': '
        + questions[i].answers[letter]
        + '</label>'
    );
    }
    output.push(
    '<div class="question">' + questions[i].question + '</div>'
    + '<div class="answers">' + answers.join('') + '</div>'
    )
    quizContainer.innerHTML = output.join('')
  }
}

function showResults (questions, quizContainer, resultsContainer) {
let answerContainers = quizContainer.querySelectorAll('.answers');
let userAnswer = '';
let numCorrect = 0
  for (var i = 0; i < questions.length; i++) {
  userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
    if (userAnswer === questions[i].correctAnswer){
        numCorrect++;
        answerContainers[i].style.color = 'green';
    } else {
        answerContainers[i].style.color = 'red'
      }
  }
resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}























});
