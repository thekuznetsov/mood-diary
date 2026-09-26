const form = document.querySelector("#mood-form");
const moodPicker = document.querySelector("#mood-picker");
const noteInput = document.querySelector("#note");
const entriesList = document.querySelector("#entries-list");

let selectedMood = null;

moodPicker.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    selectedMood = event.target.dataset.mood;
    console.log("Выбрано настроение:", selectedMood);
  }
});
