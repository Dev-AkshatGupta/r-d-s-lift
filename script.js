const simulateBtn = document.querySelector("#simulate");
const liftsNumber = document.querySelector("#lifts");
const floorsNumber = document.querySelector("#floors");
let liftQueue = [];
let liftBtn;
let lifts;
let liftToCall;
const simulationDiv = document.querySelector(".simulation");
simulateBtn.addEventListener("click", () => {
  simulationDiv.innerHTML = " <p></p>";
  if (liftsNumber.value < 4 && floorsNumber.value < 6) {
    // For floors
    createFloors(floorsNumber);
    // for lifts
    createLifts(liftsNumber);
    liftBtn = document.querySelectorAll(".btn");
    lifts = document.querySelectorAll(".lifts");

    // floor buttons for calling lifts

    liftBtn.forEach((button) => {
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
          }
          // liftToCall is closest lift
        });
        if (liftToCall.dataset.engaged === "false") {
          liftToCall.dataset.floor = button.dataset.floor;
          liftToCall.style.bottom = `${+liftToCall.dataset.floor * 70 - 70}px`;
          liftToCall.style.transition = `${closestLiftFloorDifference * 2}s`;

          timer(liftToCall)(closestLiftFloorDifference * 2000);
        } else {
          liftQueue = [...liftQueue, +button.dataset.floor];
        }
      });
    });
  }
});

function timer(liftToCall) {
  liftToCall.dataset.engaged = true;
  return (delay) => {
    setTimeout(() => {
      liftToCall.innerHTML = "<div class=door></div><div class=door-2></div>";
      setTimeout(() => {
        liftToCall.children[0].className = "";
        liftToCall.children[1].className = "";
        liftToCall.dataset.engaged = false;
        if (liftQueue[0]) {
          let floorDifference = Math.abs(
            liftQueue[0] - liftToCall.dataset.floor
          );
          liftToCall.dataset.floor = liftQueue[0];
          liftToCall.style.bottom = `${+liftToCall.dataset.floor * 70 - 70}px`;
          liftToCall.style.transition = `${floorDifference * 2}s`;

          timer(liftToCall)(floorDifference * 2000);
          liftQueue.shift();
        }
      }, delay + 2500);
    }, delay + 2500);
  };
}
function createFloors(floorsNumber) {
  const simulationDiv = document.querySelector(".simulation");
  for (let i = 1; i <= floorsNumber.value; i++) {
    let divEl = document.createElement("div");
    let button = document.createElement("button");
    let p = document.createElement("p");
    p.innerText = `floors${+floorsNumber.value + 1 - i}`;
    button.textContent = "up ";
    button.className = "btn";
    button.dataset.floor = +floorsNumber.value + 1 - i;
    divEl.className = "floor";
    simulationDiv.appendChild(divEl);
    divEl.appendChild(button);
    divEl.append(p);
  }
}

function createLifts(liftsNumber) {
  const simulationDiv = document.querySelector(".simulation");
  for (let i = 1; i <= liftsNumber.value; i++) {
    let divEl = document.createElement("div");
    divEl.className = "lifts";

    divEl.dataset.floor = 0;
    divEl.dataset.liftNumber = i;
    divEl.dataset.engaged = "false";
    divEl.style.left = `${i * 50 + i * 15}px`;
    simulationDiv.appendChild(divEl);
  }
}
