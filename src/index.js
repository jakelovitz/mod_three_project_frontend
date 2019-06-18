document.addEventListener('DOMContentLoaded', () => {
  console.log(
        "%c Easy Day",
        "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
      );

///json person OBJ
// woundArray = person.wounds




let woundArray = [{id: 1, name: "Left Arm Broken", Description: "A fractured bone"}, {id: 2, name: "Right Arm GunShot", Description: "A bullet wound"}]

let bodyPic = person.pic
innhem

document.querySelector("#start").addEventListener("click", e => {
  woundGen()
})




function woundGen(){
  wound  = woundArray[Math.floor(Math.random() * woundArray.length)]
  switch(wound.id){
  case 1:
  buildWound(wound, injury)
  injury = document.querySelector("#leftArm")
  break
  case 2:
  injury = document.querySelector("#RightArm")
  buildWound(wound, injury)
  break
 }
}


function buildWound(wound, injury){

  injury.innerHTML =`
  <p> A ${wound.name} it is a </p>
  <p> ${wound.description} </P>
  `


}
































});
