const form = document.querySelector('.form');
const send = document.querySelector('.send');
const task = document.querySelector('.task');
const taskList = document.querySelector('.taskList');
const deleteAll = document.querySelector('.deleteAll');
let idCount = 0;
let index; let taskNameOnCache;

const checkstorageID = typeof Storage; if (checkstorageID === "undefined") { // Check if storage data by HTML5 is available.
    alert("Your browser does not provide Web Storage by HTML5");
    throw new Error ("Storage not available");
}

[index, taskNameOnCache] = initPage(); // Initialize page parameters.

document.addEventListener('keyup', function(event) {
    if (event.code === 'Enter') {
        if (!task.value || !/\S/.test(task.value)) { // if the data sent has no input or only blank space
            return; // then just hit return
        }
    console.log(`>>>>>>> Listen to send button activation`);
    saveTaskOnCache(task);
    printTaskOnHTML(task);
    document.getElementById("text").value = "";
    }
})

document.addEventListener('click', function(event) { // Listen to click events.
    const clickElement = event.target;

if (clickElement.classList.contains('send')) { // get event of 'send' when hiting 'Send' button.
    if (!task.value || !/\S/.test(task.value)) { // if the data sent has no input or only blank space
        return; // then just hit return
    }
    console.log(`>>>>>>> Listen to send button activation`);
    saveTaskOnCache(task);
    printTaskOnHTML(task);
    document.getElementById("text").value = "";
}

if (clickElement.classList.contains('deleteAll')) { // get event of 'deleteAll' when hitting 'Delete All' button.
    deleteAllData();
}

if (clickElement.classList.contains('buttonDelete')) { // get event of 'delete' when hitting delete button of a task.
    console.log(`>>>>>>> Listen to buttonDelete click`);
    const tempIndex = deleteTask(clickElement);
    console.log(`refresh the HTML page starting on the Index ${tempIndex}`);
    refreshHTMLnCache(tempIndex);
}
})

function deleteAllData() {
    console.log(`Entered the DeleteAllData function`)
    localStorage.clear(); // Clear everything on Cache
    location.reload(); // Reload the page.
}

function deleteTask (el) {
    console.log(`Starting the deleteTask function`);
    let checkID;
    let tempIndex;
    [checkID, tempIndex] = findButtonPressed(el.id);
    removeTaskFromHTML(checkID);
    removeTaskFromCache(tempIndex);
    return tempIndex;
}

function saveTaskOnCache(data) {
    console.log(`Starting saveTaskOnCache function with data value as ${data.value}`);
    index++; taskNameOnCache = `task-${index}`;
    localStorage.setItem(taskNameOnCache, data.value); // Save task data on Cache
}

function printTaskOnHTML(task) {
    console.log(`Printing task on HTML`);
    buttonDelete = createButtonDelete(); // Fnc to create a delete button
    if (typeof task.value === 'undefined') {
        // This is for the page initialization when it already has data on cache
        createParagraph(buttonDelete, `${task} `);
    }
    else { // This for the webpage when is already running
        createParagraph(buttonDelete, `${task.value} `);
    }
    counting(); // Just adding "+1" for some parameters.
}

function removeTaskFromCache(tempIndex) {
    console.log(`Removing task number ${tempIndex} from cache`);
    localStorage.removeItem(`task-${tempIndex}`);
}

function removeTaskFromHTML(checkID) {
    console.log(`Removing task ${checkID} from HTML`);
    const elementButton = document.getElementById(checkID); // Get the exact ID of the button (and paragraph) to be deleted.
    const elementParagraph = elementButton.parentNode; // Get the parent ID of the button, which should be the paragraph ID.
    elementParagraph.parentNode.removeChild(elementParagraph); // Delete the paragraph, which also deletes the button.
}

function createButtonDelete(tempIndexID) {
    console.log(`Initializing createButtonDelete function`);
    if (tempIndexID || tempIndexID === 0) {
        console.log(`Creating button when tempIndexID is given`);
        const buttonDelete = document.createElement('button'); // Create a button element.
        buttonDelete.innerHTML = "Deletar"; // Give an HTML to it.
        buttonDelete.id = `buttonDelete${tempIndexID}`; // Give an ID to it.
        buttonDelete.className = `buttonDelete`;    // Give a class to it.
        console.log(`Delete button with ID ${tempIndexID} has been created`);
        return buttonDelete;    // return the button element with the desired characteristics.
    }
    else { // Use the global variable "idCount" when no argument is given.
        console.log(`Creating button when tempIndexID is not given`);
        const buttonDelete = document.createElement('button'); // Create a button element.
        buttonDelete.innerHTML = "Deletar"; // Give an HTML to it.
        buttonDelete.id = `buttonDelete${idCount}`; // Give an ID to it.
        buttonDelete.className = `buttonDelete`;    // Give a class to it.
        console.log(`Delete button with ID ${idCount} has been created`);
        return buttonDelete;    // return the button element with the desired characteristics.
    }
}

function createParagraph(buttonDelete, data, tempIndexID) {
    console.log(`Initializing createParagraph fnc`);
    if (tempIndexID || tempIndexID === 0) {
        console.log(`Creating paragraph when tempIndexID is given`);
        const paragraph = document.createElement("P"); // Create a paragraph.
        paragraph.id = `paragraph${tempIndexID}`;   // Give an ID to it.
        paragraph.innerHTML = data; // Give an HTML to it.
        paragraph.appendChild(buttonDelete); // Add a button to it.
        taskList.appendChild(paragraph); // Add the paragraph to the taskList window.
        console.log(`Created paragraph with index ${tempIndexID} and value ${data}`);
    }
    else {
        console.log(`Creating paragraph when tempIndexID is not given`);
        const paragraph = document.createElement("P"); // Create a paragraph.
        paragraph.id = `paragraph${idCount}`;   // Give an ID to it.
        paragraph.innerHTML = data; // Give an HTML to it.
        paragraph.appendChild(buttonDelete); // Add a button to it.
        taskList.appendChild(paragraph); // Add the paragraph to the taskList window.
        console.log(`Created paragraph with index ${idCount} and value ${data}`);
    }
}

function counting() {
    console.log(`Just counting...`);
    idCount++;
}

function findButtonPressed(elID) {
    console.log(`Trying to find which button was pressed...`);
    let tempIndex = 0; let checkID = `buttonDelete${tempIndex}`;
    while (elID != checkID) { // Search for the exact ID.
        tempIndex++;
        checkID = `buttonDelete${tempIndex}`;
    }
    console.log(`Found the button with ID ${checkID} and Index ${tempIndex}`);
    return [checkID, tempIndex]; // Return the right ID and Index.
}

function refreshHTMLnCache(tempIndexFnc) {
    console.log(`Starting to refresh the HTML on index ${tempIndexFnc}...`);
    while(localStorage.getItem(`task-${tempIndexFnc+1}`)) { // While exists NextTask, keep reorganizing it.
        let tempButtonDelete = createButtonDelete(tempIndexFnc); // Create button equal of deleted task button.
        let tempTaskName = `task-${tempIndexFnc}`; // Name the task equally as the deleted task.
        let tempNextTaskValue = localStorage.getItem(`task-${1+tempIndexFnc}`); // Get info of NextTask.
        createParagraph(tempButtonDelete, `${tempNextTaskValue} `, tempIndexFnc); /* Create again the paragraph of deleted task
        but now containing info from the nextTask. */
        console.log(`Created task number ${tempIndexFnc} with value ${tempNextTaskValue}`);
        localStorage.setItem(tempTaskName, tempNextTaskValue); // Save on Cache the NextTask in the pace of DeletedTask.
        console.log(`Just saved the task on cache as ${tempTaskName} and value ${tempNextTaskValue}`);
        console.log(`Getting ID of next task...`);
        tempButtonDelete = createButtonDelete((tempIndexFnc+1)); // Get ID of NextTask.
        console.log(`Next task ID is ${tempButtonDelete.id}`);
        deleteNextTask(tempButtonDelete); // DeleteNext task.
        console.log(`Now the counter is in ${tempIndexFnc}`);
        tempIndexFnc++;
        console.log(`Counting +1... Now, let's try again with the counter in ${tempIndexFnc}`);
    }
    index = tempIndexFnc - 1;
    idCount = tempIndexFnc;
    console.log(`It seems like it is over when the counter is in ${tempIndexFnc}`);
}

function deleteNextTask(el) {
    console.log(`Deleting the next task...`);
    let checkID;
    let tempIndex;
    [checkID, tempIndex] = findButtonPressed(el.id);
    removeTaskFromHTML(checkID);
    removeTaskFromCache(tempIndex);
}

function initPage() {
    console.log(`Initializing the page...`);
    let tempIndex; let tempTaskNameOnCache = `task-0`;
    if (localStorage.getItem(tempTaskNameOnCache)) { // If an initial task exists on Cache
        tempIndex = 0; // Then Index has to initialize as the first index, which is '0'.
        do { // Print all data on cache
            printTaskOnHTML(localStorage.getItem(tempTaskNameOnCache));
            tempIndex++; tempTaskNameOnCache = `task-${tempIndex}`;
        }
        while (localStorage.getItem(tempTaskNameOnCache))
        tempIndex--; tempTaskNameOnCache = `task-${tempIndex}`; // Returning to the last valid Index and TaskName
        return [tempIndex, tempTaskNameOnCache]; // Return the last Index and TaskName found.
    }
    else {
        console.log(`Uh, oh...! It seems like there is nothing to be printed`);
        tempIndex = -1; // Otherwise, Index is -1 meaning there is no index on cache yet.
        return [tempIndex, tempTaskNameOnCache]; // Return initialized Index and TaskName.
    }
}

