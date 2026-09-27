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

  if (!selectedMood) {
    showToast("Выбери настроение!");
    return;
  }

  if (noteInput.value.trim() === "") {
    showToast("Напиши заметку!");
    return;
  }

  const entry = {
    id: Date.now(),
    mood: selectedMood,
    note: noteInput.value,
    date: new Date().toISOString(),
  };

  entries.push(entry);

  renderEntries();

  saveEntries();

  noteInput.value = "";
  selectedMood = null;

  const buttons = moodPicker.querySelectorAll("button");
  buttons.forEach(function (btn) {
    btn.classList.remove("selected");
  });
});

function renderEntries() {
  entriesList.innerHTML = "";

  const emptyMessage = document.querySelector("#empty-message");
  if (entries.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  entries.forEach(function (entry) {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${entry.mood}</span>
      <span>${new Date(entry.date).toLocaleString()}</span>
      <p>${entry.note}</p>
      <button class='delete-btn' data-id='${entry.id}'>✕</button>
    `;

    entriesList.appendChild(li);
  });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}

function saveEntries() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
  const saved = localStorage.getItem("entries");
  if (saved) {
    entries = JSON.parse(saved);
  }
}

entriesList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const id = Number(event.target.dataset.id);

    entries = entries.filter(function (entry) {
      return entry.id !== id;
    });

    saveEntries();
    renderEntries();
  }
});

loadEntries();
renderEntries();
