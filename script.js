
function AddTask() {
    const tasks = {
        id: 123,
        description: "damn"
    };
    console.log(tasks);
}

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
    console.log(uuid);
    let var1 = createTask(uuid, input); //asign input to property
    console.log(var1);
    
}


//create a function that creates objects, then append the created object to the tasks object
//figure out how to dynamically create variable names and assign objects to thos so
//we can append it to takss object
