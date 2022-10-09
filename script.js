const simulateBtn = document.querySelector("#simulate");
const liftsNumber = document.querySelector("#lifts");
const floorsNumber = document.querySelector("#floors");
let liftBtn;
let lifts;
let liftToCall;

simulateBtn.addEventListener("click", () => {
  // For floors
  createFloors(floorsNumber);

  // for lifts
  createLifts(liftsNumber);

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
            +closestLiftFloorDifference &&
          lift.dataset.engaged === "false"
        ) {
          closestLiftFloorDifference = Math.abs(
            +button.dataset.floor - +lift.dataset.floor
          );
          liftToCall = lift;
          console.log(liftToCall);
        }
      });
      // liftToCall is closest lift
      liftToCall.dataset.floor = button.dataset.floor;
      liftToCall.style.bottom = `${+liftToCall.dataset.floor * 70 - 70}px`;
      liftToCall.style.transition = `${closestLiftFloorDifference * 2}s`;

      timer(liftToCall)(closestLiftFloorDifference * 2000);
    });
  });
});

function timer(liftToCall) {
  liftToCall.dataset.engaged = true;
  return (delay) => {
    setTimeout(() => {
      liftToCall.dataset.engaged = false;
      liftToCall.innerHTML = "<div class=door></div>";
      setTimeout(() => {
        console.log("doors should be there now");
        liftToCall.children.div.classList.remove = "door";
      }, 2500);
    }, delay);
  };
}
function createFloors(floorsNumber) {
  const simulationDiv = document.querySelector(".simulation");
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
}

function createLifts(liftsNumber) {
  const simulationDiv = document.querySelector(".simulation");
  for (let i = 1; i <= liftsNumber.value; i++) {
    let divEl = document.createElement("div");
    let doorDivEl = document.createElement("div");
    divEl.className = "lifts";
    // divEl.append(doorDivEl);

    divEl.dataset.floor = 0;
    divEl.dataset.liftNumber = i;
    divEl.dataset.engaged = "false";
    divEl.style.left = `${i * 40 + i}px`;
    simulationDiv.appendChild(divEl);
  }
}
