document.addEventListener('DOMContentLoaded', () => {
  console.log(
  "%c Easy Day",
    "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
  );
  const dataURL = "http://localhost:3000/api/v1/people"
  const defaultPic = "https://i.imgur.com/USOQOCa.png"
  const woundCon = document.querySelector(".wound")

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


  switch("right arm"){
    case "left arm":
      injury = document.querySelector("#leftArm")
      buildWound(wound, injury)
      woundPic =  wound.img_url
      setWoundPic(woundPic)
      break;
    case "right arm":
      injury = document.querySelector("#rightArm")
      buildWound(wound, injury)
      woundPic =  wound.img_url
      setWoundPic(woundPic)
      break;
    case "left leg":
      injury = document.querySelector("#leftLeg")
      buildWound(wound, injury)
      woundPic =  wound.img_url
      setWoundPic(woundPic)
      break;
    case "right leg":
      injury = document.querySelector("#rightLeg")
      buildWound(wound, injury)
      woundPic =  wound.img_url
      setWoundPic(woundPic)
      break;
    case "body":
      injury = document.querySelector("#body")
      buildWound(wound, injury)
      woundPic =  wound.img_url
      setWoundPic(woundPic)
      break;
    case "head":
      injury = document.querySelector("#head")
      buildWound(wound, injury)
      woundPic =  wound.img_url
      setWoundPic(woundPic)
      break;
    }
  }

function setWoundPic(woundPic){
  document.querySelector("#backdrop").innerHTML =
  `
    <img src=${woundPic}> </img>
  `
}


function buildWound(wound, injury){
  injury.style.display = "block"
    woundDisplay = document.createElement('div')
    woundDisplay.innerHTML =
  `
  <div class="modal fade" id="${injury.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary">Save changes</button>
       </div>
     </div>
   </div>
 </div>

 `

  woundCon.appendChild(woundDisplay)
  injury.innerHTML += `
  <button data-toggle='modal' data-target="#${injury.id}">Check Wound</button>
  `

}

// injury.
//   .modal {
//   position: absolute;
//   top: 10px;
//   right: 100px;
//   bottom: 0;
//   left: 0;
//   z-index: 10040;
//   overflow: auto;
//   overflow-y: auto;
// }

// <div class='modal' id='rightArm' tabIndex='-1' style='display:none'> Right Arm </div>

































});
