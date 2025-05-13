const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchBox = document.getElementById("search-box");
const dueDateInput = document.getElementById("due-date");
const prioritySelect = document.getElementById("priority");
const categorySelect = document.getElementById("category");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    if(inputBox.value === '') {
        alert("Please write something!");
        return;
    }

    const task = {
        id: Date.now(),
        text: inputBox.value,
        dueDate: dueDateInput.value,
        priority: prioritySelect.value,
        category: categorySelect.value,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    resetInputs();
}

function renderTasks(filteredTasks = tasks) {
    listContainer.innerHTML = '';
    
    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "checked" : "";

        const priorityClass = `priority-${task.priority}`;
        const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onclick="toggleTask(${task.id})">
                <div class="task-details">
                    <span class="task-title">${task.text}</span>
                    <span class="task-meta">
                        <span class="priority-badge ${priorityClass}">${task.priority}</span>
                        <span>${task.category}</span>
                        <span>Due: ${formattedDate}</span>
                    </span>
                </div>
            </div>
            <div class="task-actions">
                <span class="action-btn" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </span>
            </div>
        `;

        listContainer.appendChild(li);
    });

    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function resetInputs() {
    inputBox.value = "";
    dueDateInput.value = "";
    prioritySelect.value = "low";
    categorySelect.value = "personal";
}

function updateStats() {
    document.getElementById("total-tasks").textContent = tasks.length;
    document.getElementById("completed-tasks").textContent = tasks.filter(t => t.completed).length;
    document.getElementById("pending-tasks").textContent = tasks.filter(t => !t.completed).length;
}

function filterTasks(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }
    renderTasks(filteredTasks);
}

function sortTasks(criterion) {
    let sortedTasks = [...tasks];
    if (criterion === 'date') {
        sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (criterion === 'priority') {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        sortedTasks.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    }
    renderTasks(sortedTasks);
}

searchBox.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchTerm) ||
        task.category.toLowerCase().includes(searchTerm)
    );
    renderTasks(filteredTasks);
});

function clearList() {
    tasks = [];
    saveTasks();
    renderTasks();
}

// Initial render
renderTasks();