//tasks object 
let tasks = {
    
};

//create object
function createTask(task) {
    return {
        task: task
    };
}

function appendTask(event) {
    event.preventDefault();
    let UUID = self.crypto.randomUUID();
    let input = document.getElementById('task').value; // get input value
    let createdTask = createTask(input); //asign input to property
    tasks[UUID] = {...createdTask}; //append input as value of UUID
    save();
}

function save() {
    console.log("saved to local storage");
    let tempObj = JSON.stringify(tasks);
    localStorage.setItem("tasks", tempObj) //save to local storage
}

window.onload = function () {
    let stored = localStorage.getItem("tasks");
    if (stored) {
        tasks = JSON.parse(stored);
        console.log(tasks);
    } else {
        console.log("not tasks found");
    }
}

//next: display tasks in ui
