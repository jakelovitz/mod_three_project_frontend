let quizContainer
let resultsContainer
let submitAnswersButton
let nextWoundButton
let bodyPic
let injury
let person
let genButton
let counter = 0

let correctResponses = [];
let totalQuestions = [];

document.addEventListener('DOMContentLoaded', () => {
  console.log("%c Easy Day",
    "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)");

  const dataURL = "http://localhost:3000/api/v1/people"
  const defaultPic = "https://i.imgur.com/USOQOCa.png"
  const medicCon = document.getElementById("medicCon")
  const quizCon = document.querySelector("#quizCon")
  const pdfMed = document.querySelector("#pdfMed")
  const saraScream = new Audio("./assets/sound/sarah_scream.mp3")
  const samScream = new Audio("./assets/sound/sam_scream.mp3")


  let personsArr = []


  getWounds()

  function getWounds(){
    fetch(dataURL)
      .then(response => response.json())
      .then(data => data.forEach(x => personsArr.push(x)))
  }

  document.querySelector("#start").addEventListener("click", e => {
    genButton = e.target
    e.target.style.display = "none"
    person = personsArr[Math.floor(Math.random() * personsArr.length)]
    setBackRound()
    woundGen()
  })


  function setBackRound(){
    document.body.style.backgroundImage = 'url(./assets/img/animationBlood.gif)'
    // 'url(https://i.pinimg.com/originals/87/6f/8e/876f8e0336959d62337605578fdd4690.gif)'
  }



  function woundGen(){

    if (person.wounds.length <= 0) {
      window.alert(`You answered ${correctResponses.reduce((a, b) => a + b, 0)} out of ${totalQuestions.reduce((a, b) => a + b, 0)} correct.`)
      window.location.reload();
    }
    else {
    newWound = person.wounds.splice(Math.floor(Math.random() * person.wounds.length), 1)
    wound = newWound[0]
    treatments = wound.treatments
    woundPic =  wound.img_url
    soundEFX(person)

    switch(wound.location){
      case "Left Arm":
        injury = document.querySelector("#leftArm")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "Right Arm":
        injury = document.querySelector("#rightArm")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "Left Leg":
        injury = document.querySelector("#leftLeg")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "Right Leg":
        injury = document.querySelector("#rightLeg")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "Body":
        injury = document.querySelector("#body")
        displayWound(wound, injury)
        setWoundPic(woundPic)
        break;
      case "Head":
        injury = document.querySelector("#head")
        displayWound(wound)
        setWoundPic(woundPic)
        break;
      }
    }
  }

  function hidePreviousQuiz(){
    if (injury && quizCon) {
      injury.style.display = "none"
      quizCon.style.display = "none"
      pdfMed.style.display = "none"

    }
  }

  function soundEFX(person){
    if (person.name === 'Sarah'){
        saraScream.play()
      }
      else{
        samScream.play()
      }
  }




  function setWoundPic(woundPic){

  bodyPic = document.querySelector("#backdrop")
    bodyPic.innerHTML = `
      <img src=${woundPic} style="
      height: 500px;
      position: fixed;
     right: 500px;
    "</img>
    `
  }



  function displayWound(wound){
    injury.style.display = "block"
    woundDisplay = document.createElement('div')
    const outerDiv = document.createElement('div')
    woundDisplay.appendChild(outerDiv)

    const bodyPartDiv = document.createElement('div')
    bodyPartDiv.id = `bodypart${injury.id}`
    bodyPartDiv.innerText = `${person.name}, ${person.occupation}, suffered a ${wound.name} on the ${wound.location}
    ----------------------------------------
    ${wound.description}`
    const br1 = document.createElement('br')
    const br2 = document.createElement('br')
    const quizCreate = document.createElement('button')
    quizCreate.innerText = 'Treat wound'
    bodyPartDiv.appendChild(br1)
    bodyPartDiv.appendChild(br2)
    bodyPartDiv.appendChild(quizCreate)

    woundDisplay.appendChild(bodyPartDiv)

    injury.appendChild(woundDisplay)

    quizCreate.addEventListener('click', () =>{
    quizCreate.style="display:none"
      setPageWithQuiz()
    })

  }


  function setPageWithQuiz(){
    moveBody()
    moveInjury()
    pdfMed.style.display = "block"
    quizCon.style="display:block;width:50%;height:50%"
    quizCon.innerHTML =
    `
    <div id="quiz"></div>
    <button id="submitAnswers">Check Answer</button>
    <div id="results"></div>
    `

    createQuiz()
  }

  function moveBody(){
    bodyPic.children[0].style = "position: fixed;height: 500px;top:55px;right:50px;z-index:500000"
  }



  function moveInjury(){
    injury.querySelector(`#bodypart${injury.id}`).style = "top:2%;width:200px;right:383px;z-index:10040;"

  }




  function createQuiz(){
    quizContainer = document.getElementById('quiz')
    quizCon.style.display = ""
    injury.style.display = ""
    resultsContainer = document.getElementById('results')
    nextWoundButton = ""
    submitAnswersButton = document.getElementById('submitAnswers')

    generateQuizQuestions()
  }

  function generateQuizQuestions(){
    let questions = dynamicGenerateQuestions(treatments);
    showQuestions(questions);
    submitAnswersButton.onclick = function(){
      showResults(questions);
    }
  }


  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  return array;
  }

  function getAnswers(treatments) {
    let answers = {};
    let shuffledTreatments = shuffle(treatments)
      for (var i = 0; i < treatments.length; i++) {
        answers[String.fromCharCode(97 + i)] = `${shuffledTreatments[i].action}`
      };
    return answers
  }

  function dynamicGenerateQuestions(treatments) {
  questions = []
  answers = getAnswers(treatments)
    for (var i = 0; i < treatments.length; i++) {
      question =  {
        question: `----What is Step ${i + 1}?----`,
        answers,
        correctAnswer: `${String.fromCharCode(97 + (treatments[i].order) - 1)}`
      }
      questions.push(question)
    }
  return questions
  }

  function showQuestions(questions){
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
          + '</label><br>'
      );
      }
      output.push(
      '<div class="question">' + questions[i].question + '</div>'
      + '<div class="answers">' + answers.join('') + '</div>'
      )
      quizContainer.innerHTML = output.join('')
    }
  }

  function showResults (questions) {
    let answerContainers = quizContainer.querySelectorAll('.answers');
    let userAnswer = '';
    let numCorrect = 0
    counter++


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

    correctResponses.push(numCorrect);
    totalQuestions.push(questions.length);


    nextQuiz();
  }

  function nextQuiz() {

    quizCon.removeChild(submitAnswersButton)

    const newButton = document.createElement('button')
    newButton.innerText = 'Treat another wound'

    quizCon.appendChild(newButton)

    newButton.addEventListener('click', (e) => {
      hidePreviousQuiz()
       woundGen()

    })

  }

















});
