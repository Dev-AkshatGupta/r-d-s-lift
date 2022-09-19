const simulateBtn = document.querySelector("#simulate");
const liftsNumber = document.querySelector("#lifts");
const floorsNumber = document.querySelector("#floors");
const simulationDiv = document.querySelector(".simulation");
let liftBtn;
let closestLift = Infinity;
let lifts;
simulateBtn.addEventListener("click", () => {
  // For floors
  for (let i = 1; i <= floorsNumber.value; i++) {
    let divEl = document.createElement("div");
    let button = document.createElement("button");
    button.textContent = "call ";
    button.className = "btn";
    button.dataset.floor = i;
    divEl.className = "floor";
    simulationDiv.appendChild(divEl);
    divEl.appendChild(button);
  }

  liftBtn = document.querySelectorAll(".btn");
  // for lifts
  for (let i = 1; i <= liftsNumber.value; i++) {
    let divEl = document.createElement("div");
    divEl.className = "lifts";
    divEl.dataset.floor = 0;
    divEl.dataset.liftNumber = i;
    simulationDiv.appendChild(divEl);
  }
  lifts = document.querySelectorAll(".lifts");
  console.log(lifts[0].dataset.floor);
  //   for floor buttons for calling lifts
  console.log(liftBtn);
  let currentLiftValue;
  let liftToCall;
  liftBtn.forEach((button, index) =>
    button.addEventListener("click", () => {
      console.log(index);
      lifts.forEach((lift, idx) => {
        if (
          Number.parseInt(button.dataset.floor - lift.dataset.floor) <
          currentLiftValue
        ) {
          currentLiftValue = Number.parseInt(
            button.dataset.floor - lift.dataset.floor
          );
          liftToCall = lift;
          console.log(liftToCall);
        }
        console.log({ currentLiftValue, liftToCall });
      });
      if(currentLiftValue){
        
      }
      // currentLiftValue=index-liftsNumber
    })
  );
});
