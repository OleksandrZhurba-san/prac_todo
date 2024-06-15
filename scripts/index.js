const notesField = document.querySelector(".notes");
const saveBtn = document.querySelector(".save");
const notesGrid = document.querySelector(".notes-grid");

const notesStorage = JSON.parse(localStorage.getItem("notes")) || [];
function generateRandomId() {
  return Math.floor(Math.random() * 88888888888888);
}
function setId() {
  let id = 0;
  if (notesStorage.length === 0) {
    id = generateRandomId();
  } else {
    id = notesStorage[notesStorage.length - 1].id + 1;
  }
  console.log(id);
  return id;
}
function getLastId() {
  return notesStorage[notesStorage.length - 1].id;
}
function createNote(text, id) {
  const note = document.createElement("p");
  note.textContent = text;
  note.setAttribute("data-id", id);
  notesGrid.appendChild(note);
  note.addEventListener("click", (event) => {
    notesGrid.removeChild(event.target);
    const noteIndex = notesStorage.map((e) => e.id).indexOf(id);
    if (noteIndex != -1) {
      notesStorage.splice(noteIndex, 1);
      localStorage.setItem("notes", JSON.stringify(notesStorage));
    }
  });
  return note;
}
document.addEventListener("DOMContentLoaded", () => {
  if (notesStorage.length != 0) {
    notesStorage.forEach((element) => {
      console.log(element);
      createNote(element.note, element.id);
    });
  }

  saveBtn.addEventListener("click", () => {
    if (notesField.value !== "") {
      let id = setId();
      notesStorage.push({ id: id, note: notesField.value });
      createNote(notesField.value, id);
      localStorage.setItem("notes", JSON.stringify(notesStorage));
      notesField.value = "";
    }
  });
});
