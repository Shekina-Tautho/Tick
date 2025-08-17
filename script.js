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
        gridClass: "col",
        deleteText: "Delete",
        deleteClass: "btn btn-danger",
        uuid: UUID,
    };

    containers[UUID] = createdContainer;
    saveContainers();
    renderContainer(createdContainer);

    inputElement.value = '';
}


function saveContainers() {
    localStorage.setItem("containers", JSON.stringify(containers));
}


function renderContainer(c) {
    let bodyOutline = document.getElementById("body-outline");
    bodyOutline.classList.add('p-4');

    let rowDiv = document.createElement('div');
    let gridDiv = document.createElement('div');
    gridDiv.className = c.gridClass;
    gridDiv.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'gap-2');


    let custom = document.createElement('label');
    custom.className = 'custom-checkbox';

    let customInput = document.createElement('input');
    customInput.type = 'checkbox';
    customInput.dataset.uuid = c.uuid; 
    customInput.checked = c.completed; 

    let checkmark = document.createElement('span');
    checkmark.className = "checkmark";

    custom.appendChild(customInput);
    custom.appendChild(checkmark);

    
    let span = document.createElement('span');
    span.textContent = c.task;
    span.id = 'task-container';
    span.classList.add('span-container');
    span.setAttribute("contenteditable", "true");       
    if (c.completed) {
        custom.classList.add('ticked');
        span.classList.add('done');
        span.classList.add('glowContainer');
    } else {
        custom.classList.remove('ticked');
        span.classList.remove('done');
        span.classList.remove('glowContainer');
    }

    span.addEventListener("input", function () {
    let uuid = c.uuid;  
    containers[uuid].task = span.textContent;  
    saveContainers();  
    });


   
    let delBtn = document.createElement('button');
    delBtn.classList.add('del');
    delBtn.dataset.uuid = c.uuid;

    let icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-trash'); 
    delBtn.appendChild(icon);


    gridDiv.appendChild(custom);
    gridDiv.appendChild(span);
    gridDiv.appendChild(delBtn);
    rowDiv.appendChild(gridDiv);
    bodyOutline.appendChild(rowDiv);


    customInput.addEventListener('change', function (event) {
        let uuid = event.currentTarget.dataset.uuid;
        containers[uuid].completed = event.currentTarget.checked;

        if (event.currentTarget.checked) {
            span.classList.add('done');
            custom.classList.add('ticked');
            span.classList.add('glowContainer');
        } else {
            span.classList.remove('done');
            custom.classList.remove('ticked');
            span.classList.remove('glowContainer');
        }

        saveContainers();
    });

    delBtn.addEventListener('click', handleDelete);
}



function handleDelete(event) {
    let uuid = event.currentTarget.dataset.uuid;
    delete containers[uuid];
    saveContainers();
    event.target.closest('div').remove();
}


function loadContainers() {
    let stored = localStorage.getItem('containers');
    if (stored) {
        containers = JSON.parse(stored);
        for (let id in containers) {
            renderContainer(containers[id]);
        }
    }
}


window.onload = function () {
    loadContainers();
};