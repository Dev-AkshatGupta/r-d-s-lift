const simulateBtn = document.querySelector("#simulate");
const liftsNumber = document.querySelector("#lifts");
const floorsNumber = document.querySelector("#floors");
const simulationDiv = document.querySelector(".simulation");
let liftBtn;
let lifts;
let liftToCall;

simulateBtn.addEventListener("click", () => {

  // For floors

  for (let i = 1; i <= floorsNumber.value; i++) {
    let divEl = document.createElement("div");
    let button = document.createElement("button");
    button.textContent = "call ";
    button.className = "btn";
    button.dataset.floor = +floorsNumber.value + 1 - i;
    divEl.className = "floor";
    simulationDiv.appendChild(divEl);
    divEl.appendChild(button);
  }

  // for lifts

  for (let i = 1; i <= liftsNumber.value; i++) {
    let divEl = document.createElement("div");
    divEl.className = "lifts";
    divEl.dataset.floor = 0;
    divEl.dataset.liftNumber = i;
    divEl.style.left = `${i * 40 + i}px`;
    simulationDiv.appendChild(divEl);
  }

  liftBtn = document.querySelectorAll(".btn");
  lifts = document.querySelectorAll(".lifts");

  // floor buttons for calling lifts

  liftBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
      // loop for finding the closest lift
      let closestLiftFloorDifference = 10;
      lifts.forEach((lift, idx) => {
        if (
          Math.abs(+button.dataset.floor - +lift.dataset.floor) <
          +closestLiftFloorDifference
        ) {
          closestLiftFloorDifference = Math.abs(
            +button.dataset.floor - +lift.dataset.floor
          );
          liftToCall = lift;
        }
      });
      // liftToCall is closest lift
      liftToCall.dataset.floor = button.dataset.floor;
      liftToCall.style.bottom = `${+liftToCall.dataset.floor * 70 - 70}px`;
    });
  });
});

function createFloors(floorsNumber){
  
}