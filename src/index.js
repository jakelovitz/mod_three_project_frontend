document.addEventListener('DOMContentLoaded', () => {
  console.log("%c Easy Day",
    "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)");

  const dataURL = "http://localhost:3000/api/v1/people"
  const defaultPic = "https://i.imgur.com/USOQOCa.png"
  const woundCon = document.querySelector(".wound")
  const medicCon = document.getElementById("medicCon")
  let personsArr = []

  getWounds()

  function getWounds(){
    fetch(dataURL)
      .then(response => response.json())
      .then(data => data.forEach(x => personsArr.push(x)))
  }

  document.querySelector("#start").addEventListener("click", e => {
    e.target.style.display = "none"

    woundGen()
  })

  function woundGen(){
    person = personsArr[Math.floor(Math.random() * personsArr.length)]
    wound  = person.wounds[Math.floor(Math.random() * person.wounds.length)]
    woundPic =  wound.img_url
    console.log(person)

    switch(wound.name){
      case "left arm":
          injury = document.querySelector("#leftArm")
          buildWound(wound, injury)
          setWoundPic(woundPic)
          break;
        case "right arm":
          injury = document.querySelector("#rightArm")
          buildWound(wound, injury)
          setWoundPic(woundPic)
          break;
        case "left leg":
          injury = document.querySelector("#leftLeg")
          buildWound(wound, injury)
          setWoundPic(woundPic)
          break;
        case "right leg":
          injury = document.querySelector("#rightLeg")
          buildWound(wound, injury)
          setWoundPic(woundPic)
          break;
        case "body":
          injury = document.querySelector("#body")
          buildWound(wound, injury)
          setWoundPic(woundPic)
          break;
        case "head":
          injury = document.querySelector("#head")
          buildWound(wound, injury)
          setWoundPic(woundPic)
          break;
      }
  }

  function setWoundPic(woundPic){
    document.querySelector("#backdrop").innerHTML =
    `
      <img src=${woundPic} style="height: 500px"> </img>
    `
  }


  function buildWound(wound, injury){
    injury.style.display = "block"
    woundDisplay = document.createElement('div')
    woundDisplay.innerHTML =
      `
      <div>
        <div id="bodypart${injury.id}">
          ${wound.name}!!
          <div id="quiz"></din>
          <button id="submit">ButtonText</button>
          <div id="results"></div>
        </div>
      </div>
      `
    medicCon.appendChild(woundDisplay)

    injury.innerHTML += `
      <button id="generateForm" type="button" data-toggle='modal' data-target="#${injury.id}">Check Wound</button>
    `
    document.getElementById("generateForm").onclick = function() {
      woundDisplay.style.display = "block";
    }

    checkAnswers(injury.id)
  }

  function checkAnswers(injury) {
    
    let buttonsBar = document.getElementById(`bodypart${injury}`)

    
    storedResponses = []
    
    buttonsBar.addEventListener('click', (e) => {
      const allowedList = ['response1', 'response2', 'response3', 'response4'] // we need to store this answer list somewhere

      const button = event.target.id

      // debugger

      //code to see if the user clicked one of the buttons. May not be necessary
      // if (allowedList.includes(button)) { console.log ('a');} else {
      //   return checkAnswers(injury)
      // }

      if (button === allowedList[0]) {
        document.alert('Correct!');
      }
    })


  }

  function generateQuiz(quizContainer, resultsContainer, submitButton){

    let questions = generateQuestions();

    function showQuestions(questions, quizContainer){
      let output = [];
      let answers;

      for(var i = 0, i < questions.length, i++){
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
  
    function showResults(questions, quizContainer, resultsContainer){
      // code will go here
    }
  
    // show the questions
    showQuestions(questions, quizContainer);
  
    // when user clicks submit, show results
    submitButton.onclick = function(){
      showResults(questions, quizContainer, resultsContainer);
    }
  }

  function generateQuestions(){
    let questions = [
      {
        question: "What is the first step?",
        answers: {
          a: "Step 1",
          b: "Step 2",
          c: "Step 3"
        }
        correctAnswer: "B"
      }

      {
        question: "what is the second step?",
        answers: {
          a: "Step 1",
          b: "Step 2",
          c: "Step 3"
        }
        correctAnswer: "A"
      }

      {
        question: "what is the third step?",
        answers: {
          a: "Step 1",
          b: "Step 2",
          c: "Step 3"
        }
        correctAnswer: "C"
      }
    ]
    return questions
  }






























});
