const form = document.querySelector("#mood-form");
const moodPicker = document.querySelector("#mood-picker");
const noteInput = document.querySelector("#note");
const entriesList = document.querySelector("#entries-list");

let selectedMood = null;

moodPicker.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const buttons = moodPicker.querySelectorAll("button");
    buttons.forEach(function (btn) {
      btn.classList.remove("selected");
    });

    event.target.classList.add("selected");

    selectedMood = event.target.dataset.mood;
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Форма отправлена!");
  console.log("Настроение:", selectedMood);
  console.log("Заметка:", noteInput.value);
});
