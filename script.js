// --- Form Validation ---
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const emailInput = document.getElementById('email');

const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

// Real-time email validation
emailInput.addEventListener('input', function() {
    if(this.value.match(emailPattern)) {
        formMessage.textContent = '';
    }
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = emailInput.value.trim();
    const message = document.getElementById('message').value.trim();

    if(name === '' || email === '' || message === '') {
        formMessage.textContent = 'Please fill in all fields!';
        formMessage.style.color = 'red';
    } else if(!email.match(emailPattern)) {
        formMessage.textContent = 'Please enter a valid email!';
        formMessage.style.color = 'red';
    } else {
        formMessage.textContent = 'Form submitted successfully!';
        formMessage.style.color = 'green';
        contactForm.reset();
    }

    // Clear message after 3 seconds
    setTimeout(() => formMessage.textContent = '', 3000);
});

// --- To-Do List ---
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.addEventListener('load', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTask(task));
});

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText === '') return;

    createTask(taskText);
    taskInput.value = '';
    saveTasks();
});

function createTask(taskText) {
    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.addEventListener('click', () => {
        taskSpan.classList.toggle('completed');
        saveTasks();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    li.appendChild(taskSpan);
    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.firstChild.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks including completion status
window.addEventListener('load', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        createTask(task.text);
        if(task.completed) {
            taskList.lastChild.firstChild.classList.add('completed');
        }
    });
});
