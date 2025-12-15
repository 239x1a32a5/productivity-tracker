let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = localStorage.getItem("theme") || "light";

const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const themeToggle = document.getElementById("themeToggle");

if (theme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `
      priority-${task.priority}
      ${task.completed ? "completed" : ""}
    `;

    li.innerHTML = `
      <div onclick="toggleTask(${index})">
        <strong>${task.name}</strong><br>
        <small>Priority: ${task.priority}</small><br>
        <small>Due: ${task.dueDate || "None"}</small>
      </div>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    taskList.appendChild(li);
  });

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter(t => t.completed).length;

  saveTasks();
}

function addTask() {
  const name = document.getElementById("taskName").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!name) return alert("Task name required");

  tasks.push({
    name,
    priority,
    dueDate,
    completed: false
  });

  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";

  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
