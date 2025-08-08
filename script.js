//tasks object 
let tasks = {};
let containers = {};

function createTask(task) {
    return {
        task: task
    };
}

function appendTask(event) {
    event.preventDefault();

    let inputElement = document.getElementById('task');
    let inputValue = inputElement.value.trim();

    if (!inputValue) return;

    let UUID = self.crypto.randomUUID();

    
    let createdTask = createTask(inputValue);
    tasks[UUID] = { ...createdTask };
    saveTasks();

    
    appendContainer(UUID, inputValue);

    inputElement.value = '';
}


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function appendContainer(UUID, taskValue) {
    let createdContainer = {
        task: taskValue,
        rowClass: "row",
        gridClass: "col-md-4 bg-info"
    };
    containers[UUID] = createdContainer;

    saveContainers();
    renderContainer(createdContainer);
}


function saveContainers() {
    localStorage.setItem("containers", JSON.stringify(containers));
}


function renderContainer(c) {
    let rowDiv = document.createElement('div');
    rowDiv.className = c.rowClass;

    let gridDiv = document.createElement('div');
    gridDiv.className = c.gridClass;
    gridDiv.textContent = c.task;

    rowDiv.appendChild(gridDiv);
    document.body.appendChild(rowDiv);
}


function loadContainers() {
    let storedContainers = localStorage.getItem('containers');
    if (storedContainers) {
        containers = JSON.parse(storedContainers);
        for (let id in containers) {
            renderContainer(containers[id]);
        }
    }
}

//  restore tasks and containers as soon as page loads
window.onload = function () {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) tasks = JSON.parse(storedTasks);

    loadContainers();
};


//next: delete button per card
