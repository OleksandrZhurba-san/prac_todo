// const notesField = document.querySelector(".notes");
// const saveBtn = document.querySelector(".save");
// const notesGrid = document.querySelector(".notes-grid");
const form = document.querySelector("form");
const descriptionInput = document.querySelector(".description");
const dateInput = document.querySelector(".date");
const addBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clear");
const todoList = document.querySelector(".todo-list");

const tasksStorage = JSON.parse(localStorage.getItem("notes")) || [];
// if (tasksStorage.length !== 0) {
//   tasksStorage.forEach((task) => {
//     createTask(task);
//   });
// }

function generateRandomId() {
  return Math.floor(Math.random() * 88888888888888);
}
function setId() {
  let id = 0;
  if (tasksStorage.length === 0) {
    id = generateRandomId();
  } else {
    id = tasksStorage[tasksStorage.length - 1].id + 1;
  }
  console.log(id);
  return id;
}

function getLastId() {
  return tasksStorage[tasksStorage.length - 1].id;
}

function createTask(taskObject) {
  const liContainer = document.createElement("li");
  const checkBox = document.createElement("input");
  const taskDate = document.createElement("p");
  const taskDescription = document.createElement("h3");
  const inputContainer = document.createElement("div");
  const contentContainer = document.createElement("div");

  inputContainer.setAttribute("class", "input");
  contentContainer.setAttribute("class", "content");
  checkBox.setAttribute("type", "checkbox");
  // checkBox.setAttribute("checked", taskObject.complete.toString());
  checkBox.checked = taskObject.complete;
  taskDescription.textContent = taskObject.description;
  taskDate.textContent = taskObject.date;
  liContainer.setAttribute("data-id", taskObject.id);
  inputContainer.appendChild(checkBox);
  contentContainer.append(taskDate, taskDescription);
  liContainer.append(inputContainer, contentContainer);
  todoList.append(liContainer);
  // checkBox.addEventListener("change", (event) => {});

  // note.addEventListener("click", (event) => {
  //   notesGrid.removeChild(event.target);
  //   const noteIndex = tasksStorage.map((e) => e.id).indexOf(id);
  //   if (noteIndex != -1) {
  //     tasksStorage.splice(noteIndex, 1);
  //     localStorage.setItem("notes", JSON.stringify(tasksStorage));
  //   }
  // });
  // return note;
}

document.addEventListener("DOMContentLoaded", () => {
  if (tasksStorage.length != 0) {
    tasksStorage.forEach((element) => {
      createTask(element);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (descriptionInput !== "") {
      let id = setId();
      const newTask = {
        id: id,
        description: descriptionInput.value,
        date: dateInput.value,
        complete: false,
      };
      createTask(newTask);
      tasksStorage.push(newTask);
      // createTask(notesField.value, id);
      localStorage.setItem("notes", JSON.stringify(tasksStorage));
      // notesField.value = "";
    }
  });
});

// const testCheckBox = document.querySelector(".checkBox");
// const p = document.querySelector("p");
// const contentDescription = document.querySelector("h3");
// testCheckBox.addEventListener("change", (event) => {
//   p.classList.toggle("checked");
//   contentDescription.classList.toggle("checked");
// });
