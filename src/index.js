document.addEventListener('DOMContentLoaded', () => {
  console.log(
        "%c Easy Day",
        "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
      );

// getWounds()
let personsArr = []



// function getWounds()
// fetch()
//   .then(res => res.json())
//   .then(persons => {
//     persons.map
//   })


// let woundArray = [{id: 1, name: "Left Arm Broken", Description: "A fractured bone"}, {id: 2, name: "Right Arm GunShot", Description: "A bullet wound"}]
//


document.querySelector("#start").addEventListener("click", e => {
woundGen()
})

function woundGen(){
  // person = personsArr[Math.floor(Math.random() * personsArr.length)]
  // wound  = person.wounds[Math.floor(Math.random() * person.wounds.length)]
  let testArr = ["left arm", "right arm", "left leg", "right leg", "body", "head"]
  let test = testArr[Math.floor(Math.random() * testArr.length)]
  //^this will be from the json
  let woundPic = "https://i.imgur.com/8qNZ1Ux.png"
  //^wound pic will be the call for the url assoicated with the wound that replaces the backdrop

  switch(test){
  case "left arm":
  injury = document.querySelector("#leftArm")
  buildWound(test, injury)
  setWoundPic("https://i.imgur.com/f5prGHs.png")
  break
  case "right arm":
  injury = document.querySelector("#rightArm")
  buildWound(test, injury)
  setWoundPic("https://i.imgur.com/2FlwKX3.png")
  break
  case "left leg":
  injury = document.querySelector("#leftLeg")
  buildWound(test, injury)
  setWoundPic(woundPic)
  break
  case "right leg":
  injury = document.querySelector("#rightLeg")
  buildWound(test, injury)
  setWoundPic("https://i.imgur.com/VRUFDLE.png")
  break
  case "body":
  injury = document.querySelector("#body")
  buildWound(test, injury)
  setWoundPic("https://i.imgur.com/5RQ9MEO.png")
  break
  case "head":
  injury = document.querySelector("#head")
  buildWound(test, injury)
  setWoundPic("https://i.imgur.com/SA2g6vW.png")
  break
 }
}

function setWoundPic(woundPic){
document.querySelector("#backdrop").innerHTML = `

                      <img src=${woundPic}> </img>
`

}


function buildWound(wound, injury){

  injury.style.display = "block"
  // injury.innerHTML =`
  // <p> A ${wound.name} it is a </p>
  // <p> ${wound.description} </P>
  // `


}
































});
