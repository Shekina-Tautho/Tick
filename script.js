//tasks object 
let tasks = {

};

//create object
function createTask(id, task) {
    console.log("task created");
    return {
        Id: id,
        task: task
    };
}


function appendTask() {
    let input = document.getElementById('task').value; // get input value
    let uuid = self.crypto.randomUUID(); //generate random uuid
    //console.log(uuid);
    let createdTask = createTask(uuid, input); //asign input to property
    //console.log(createdTask);
    tasks = {...createdTask};
    console.log(tasks);
}


//goal1: create a function that creates objects, then append the created object to the tasks object
//create a pre-made object (will hold the task created) that will not change values upon refresh
//figure out how to dynamically create variable names and assign objects to thos so
//we can append it to takss object
