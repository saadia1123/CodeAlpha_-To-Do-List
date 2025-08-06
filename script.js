const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span contenteditable="false">${task.name}</span>
      <div class="actions">
        <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
        <button onclick="editTask(${index}, this)">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const name = taskInput.value.trim();
  if (name === '') return;
  tasks.push({ name, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index, button) {
  const li = button.closest('li');
  const span = li.querySelector('span');

  if (button.textContent === 'Edit') {
    span.contentEditable = true;
    span.focus();
    button.textContent = 'Save';
  } else {
    span.contentEditable = false;
    tasks[index].name = span.textContent.trim();
    button.textContent = 'Edit';
    saveTasks();
    renderTasks();
  }
}

taskForm.addEventListener('submit', addTask);
renderTasks();
