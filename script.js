//tasks object 
let tasks = {
    
};

//create object
function createTask(task) {
    console.log("task created");
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
    console.log(tasks);
}


