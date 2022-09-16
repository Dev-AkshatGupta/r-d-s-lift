const simulateBtn = document.querySelector("#simulate");
const liftsNumber = document.querySelector("#lifts");
const floorsNumber = document.querySelector("#floors");
let lifts, floors;

simulateBtn.addEventListener("click", () => {
  lifts = liftsNumber.value;
  floors = floorsNumber.value;
  console.log(liftsNumber.value, floors);
});
