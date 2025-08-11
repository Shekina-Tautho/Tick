let containers = {};

function appendTask(event) {
    event.preventDefault();

    let inputElement = document.getElementById('task');
    let inputValue = inputElement.value.trim();
    if (!inputValue) return;

    let UUID = self.crypto.randomUUID();

    let createdContainer = {
        task: inputValue,
        completed: false,   
        rowClass: "row",
        gridClass: "col-md-4 bg-info",
        deleteText: "Delete",
        deleteClass: "btn btn-danger",
        uuid: UUID,
        spanClass: "text-decoration-line-through"
    };

    containers[UUID] = createdContainer;
    saveContainers();
    renderContainer(createdContainer);

    inputElement.value = '';
}

// Save containers to localStorage
function saveContainers() {
    localStorage.setItem("containers", JSON.stringify(containers));
}

// Render a single container
function renderContainer(c) {
    let rowDiv = document.createElement('div');
    rowDiv.className = c.rowClass;

    let gridDiv = document.createElement('div');
    gridDiv.className = c.gridClass;

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.dataset.uuid = c.uuid;
    checkbox.checked = c.completed; // Restore checked state

    let span = document.createElement('span');
    span.textContent = c.task;
    span.setAttribute("contenteditable", "true");
    if (c.completed) {
        span.classList.add(c.spanClass);
    }

    gridDiv.appendChild(checkbox);
    gridDiv.appendChild(span);

    let delBtn = document.createElement('button');
    delBtn.className = c.deleteClass;
    delBtn.textContent = c.deleteText;
    delBtn.dataset.uuid = c.uuid;
    gridDiv.appendChild(delBtn);

    rowDiv.appendChild(gridDiv);
    document.body.appendChild(rowDiv);

    // Delete handler
    delBtn.addEventListener('click', handleDelete);

    // Checkbox handler
    checkbox.addEventListener('change', function (event) {
        let uuid = event.currentTarget.dataset.uuid;
        containers[uuid].completed = event.currentTarget.checked;
        
        if (event.currentTarget.checked) {
            span.classList.add(containers[uuid].spanClass);
        } else {
            span.classList.remove(containers[uuid].spanClass);
        }
        
        saveContainers();
    });
}

// Handle delete
function handleDelete(event) {
    let uuid = event.currentTarget.dataset.uuid;
    delete containers[uuid];
    saveContainers();
    event.target.closest('div').remove();
}

// Load containers from localStorage
function loadContainers() {
    let stored = localStorage.getItem('containers');
    if (stored) {
        containers = JSON.parse(stored);
        for (let id in containers) {
            renderContainer(containers[id]);
        }
    }
}

// On page load
window.onload = function () {
    loadContainers();
};

//next: edit task