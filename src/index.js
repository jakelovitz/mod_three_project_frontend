let quizContainer
let resultsContainer
let submitAnswersButton
let bodyPic
let injury
let person
let genButton
let counter = 0;

let correctResponses = [];
let totalQuestions = [];

document.addEventListener('DOMContentLoaded', () => {
  console.log("%c Easy Day",
    "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)");

  const dataURL = "http://localhost:3000/api/v1/people"
  const defaultPic = "https://i.imgur.com/USOQOCa.png"
  const medicCon = document.getElementById("medicCon")
  const quizCon = document.querySelector("#quizCon")
  let personsArr = []


  getWounds()

  function getWounds(){
    fetch(dataURL)
      .then(response => response.json())
      .then(data => data.forEach(x => personsArr.push(x)))
      console.log(personsArr)

  }

  document.querySelector("#start").addEventListener("click", e => {
    genButton = e.target
    e.target.style.display = "none"
    person = personsArr[Math.floor(Math.random() * personsArr.length)]
    woundGen() // this is what triggers the actual quiz bit
  })



  function woundGen(){
    if (person.wounds.length <= 0) {
      window.alert('message')
    }
    else {
    // debugger
    // hidePreviousQuiz()
    newWound = person.wounds.splice(Math.floor(Math.random() * person.wounds.length), 1)
    wound = newWound[0]
    treatments = wound.treatments
    woundPic =  wound.img_url
    // console.log(person)
    // console.log(wound)
    // console.log(treatments)
    // console.log(woundPic)
    console.log('woundGen 53:', wound.location)


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
    }
  }


  function setWoundPic(woundPic){
  bodyPic = document.querySelector("#backdrop")

    bodyPic.innerHTML = `
      <img src=${woundPic} style="
      height: 500px;
      position: absolute;
      right: 40%;
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
    bodyPartDiv.innerText = wound.name
    const br1 = document.createElement('br')
    const br2 = document.createElement('br')
    const quizCreate = document.createElement('button')
    quizCreate.innerText = 'Treat wound'
    bodyPartDiv.appendChild(br1)
    bodyPartDiv.appendChild(br2)
    bodyPartDiv.appendChild(quizCreate)

    woundDisplay.appendChild(bodyPartDiv)
    // woundDisplay.innerHTML =
    //   `
    //   <div>
    //     <div id="bodypart${injury.id}">
    //       ${wound.name}
    //       <br>
    //       <br>
    //       ${wound.description}
    //       <button id="createQuizSubmit">Treat wound</button>
    //     </div>
    //   </div>
    //   `
    injury.appendChild(woundDisplay)
    console.log('displayWound 128:', wound.location)
    // debugger
    // let quizCreate = document.getElementById("createQuizSubmit")
    console.log(person.wounds)
    
    quizCreate.addEventListener('click', () =>{
      console.log(person.wounds)
    //   // debugger
    quizCreate.style="display:none"
      setPageWithQuiz()
    })

  }

  

  function setPageWithQuiz(){
    // debugger
    moveBody()
    moveInjury()
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
    bodyPic.children[0].style.right = "10%"
  }

  function moveInjury(){
    injury.style = "position:absolute;right: 35%;height: 125px; width: 125px;"

  }



  function createQuiz(){
    quizContainer = document.getElementById('quiz')
    quizCon.style.display = ""
    injury.style.display = ""
    resultsContainer = document.getElementById('results')
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
        question: `What is Step ${i + 1}?`,
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

  function showFinalResults(){
    console.log("this function will show a final test page")
  }

  function nextQuiz() {
    let button = document.querySelector('#submitAnswers')
    button.innerText = 'Treat another wound'
    // button.innerText = 'Treat another wound'
    // button.id = 'treatNewWound'
    // button = document.querySelector('#treatNewWound')
    let newWoundElement = person.wounds.indexOf(wound) + 1
    wound = person.wounds[newWoundElement]

    button.addEventListener('click', (e) => {
      // console.log('before wound gen')
      hidePreviousQuiz()
      counter += 1;

      woundGen()
      // console.log('after wound gen')

    })

  }


















});
