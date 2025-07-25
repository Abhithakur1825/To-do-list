const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll("[data-filter]");
const themeToggle = document.getElementById("themeToggle");
 
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
 
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
 
function renderTasks() {
  taskList.innerHTML = "";
 
  const filteredTasks = tasks.filter(function(task) {
    if (currentFilter === "all") return true;
    if (currentFilter === "completed") return task.completed;
    return !task.completed;
  });
 
  filteredTasks.forEach(function(task, index) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
 
    const span = document.createElement("span");
    span.innerText = task.text;
    span.onclick = function () {
      toggleTask(index);
    };
 
    const actions = document.createElement("div");
    actions.className = "task-actions";
 
    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit";
    editIcon.onclick = function () {
      editTask(index);
    };
 
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    deleteIcon.onclick = function () {
      deleteTask(index);
    };
 
    actions.appendChild(editIcon);
    actions.appendChild(deleteIcon);
 
    li.appendChild(span);
    li.appendChild(actions);
 
    taskList.appendChild(li);
  });
}
 
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}
 
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}
 
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}
 
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
 
addTaskBtn.addEventListener("click", addTask);
 
taskInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") addTask();
});
 
filterButtons.forEach(function(button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});
 
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
 
renderTasks();