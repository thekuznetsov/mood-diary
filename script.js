const form = document.querySelector("#mood-form");
const moodPicker = document.querySelector("#mood-picker");
const noteInput = document.querySelector("#note");
const entriesList = document.querySelector("#entries-list");

let selectedMood = null;
let entries = [];

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

  const entry = {
    mood: selectedMood,
    note: noteInput.value,
    date: new Date(),
  };

  entries.push(entry);

  console.log("Добавлена запись:", entry);
  console.log("Все записи:", entries);
});
