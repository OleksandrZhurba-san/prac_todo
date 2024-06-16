const form = document.querySelector("form");
const descriptionInput = document.querySelector(".description");
const dateInput = document.querySelector(".date");
const addBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clear");
const todoList = document.querySelector(".todo-list");
const allFilter = document.querySelector(".all");
const activeFilter = document.querySelector(".active");
const finishedFilter = document.querySelector(".finished");
const searchInput = document.querySelector(".search");

const tasksStorage = JSON.parse(localStorage.getItem("notes")) || [];

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
  checkBox.checked = taskObject.complete;
  if (taskObject.complete) {
    taskDate.classList.add("checked");
    taskDescription.classList.add("checked");
  } else {
    taskDate.classList.remove("checked");
    taskDescription.classList.remove("checked");
  }
  taskDescription.textContent = taskObject.description;
  taskDate.textContent = taskObject.date;
  liContainer.setAttribute("data-id", taskObject.id);
  inputContainer.appendChild(checkBox);
  contentContainer.append(taskDate, taskDescription);
  liContainer.append(inputContainer, contentContainer);
  todoList.append(liContainer);
  checkBox.addEventListener("change", (event) => {
    taskDate.classList.toggle("checked");
    taskDescription.classList.toggle("checked");
    let complete = false;
    if (taskObject.complete === false) {
      complete = true;
      taskObject.complete = true;
    } else {
      complete = false;
      taskObject.complete = false;
    }
    let objIndex = tasksStorage.findIndex((obj) => obj.id === taskObject.id);
    tasksStorage[objIndex].complete = complete;
    if (document.querySelector("#active-filter") !== null) {
      let getActiveFilter = document
        .querySelector("#active-filter")
        .getAttribute("class");
      if (getActiveFilter === "finished" && !complete) {
        document
          .querySelector(`[data-id='${tasksStorage[objIndex].id}']`)
          .classList.add("display-none");
      } else if (getActiveFilter === "active" && complete) {
        document
          .querySelector(`[data-id='${tasksStorage[objIndex].id}']`)
          .classList.add("display-none");
      } else {
        resetFilters();
      }
    }
    localStorage.setItem("notes", JSON.stringify(tasksStorage));
  });
}
function resetFilters() {
  document.querySelectorAll(".display-none").forEach((e) => {
    e.classList.remove("display-none");
  });
}
function searchTasks(tasksList, value) {}
searchInput.addEventListener("input", () => {
  searchTasks(tasksStorage, searchInput.value);
});

document.addEventListener("DOMContentLoaded", () => {
  if (tasksStorage.length != 0) {
    tasksStorage.forEach((element) => {
      createTask(element);
    });
  }
  allFilter.setAttribute("id", "active-filter");
  finishedFilter.removeAttribute("id");
  activeFilter.removeAttribute("id");

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
      localStorage.setItem("notes", JSON.stringify(tasksStorage));
    }
  });
  activeFilter.addEventListener("click", () => {
    resetFilters();
    activeFilter.setAttribute("id", "active-filter");
    finishedFilter.removeAttribute("id");
    allFilter.removeAttribute("id");
    tasksStorage.filter((e) => {
      if (e.complete === true) {
        document
          .querySelector(`[data-id='${e.id}']`)
          .classList.add("display-none");
      }
    });
  });
  allFilter.addEventListener("click", () => {
    resetFilters();
    allFilter.setAttribute("id", "active-filter");
    finishedFilter.removeAttribute("id");
    activeFilter.removeAttribute("id");
  });
  finishedFilter.addEventListener("click", () => {
    resetFilters();
    finishedFilter.setAttribute("id", "active-filter");
    activeFilter.removeAttribute("id");
    allFilter.removeAttribute("id");
    tasksStorage.filter((e) => {
      if (e.complete === false) {
        document
          .querySelector(`[data-id='${e.id}']`)
          .classList.add("display-none");
      }
    });
  });
});
