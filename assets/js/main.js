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
console.log(index);

document.addEventListener('keyup', function(event) {
    if (event.code === 'Enter') {
        saveTaskOnCache(task);
        printTaskOnHTML(task);
    }
})

document.addEventListener('click', function(event) { // Listen to click events.
    const clickElement = event.target;

if (clickElement.classList.contains('send')) { // get event of 'send' when hiting 'Send' button.
    if (!task.value || !/\S/.test(task.value)) { // if the data sent has no input or only blank space
        return; // then just hit return
    }
        saveTaskOnCache(task);
        printTaskOnHTML(task);
        console.log(index);
}

if (clickElement.classList.contains('deleteAll')) { // get event of 'deleteAll' when hitting 'Delete All' button.
    deleteAllData();
}

if (clickElement.classList.contains('buttonDelete')) { // get event of 'delete' when hitting delete button of a task.
    const tempIndex = deleteTask(clickElement);
    refreshHTMLnCache(tempIndex);
}
})

function deleteAllData() {
    localStorage.clear(); // Clear everything on Cache
    location.reload(); // Reload the page.
}

function deleteTask (el) {
    let checkID;
    let tempIndex;
    [checkID, tempIndex] = findButtonPressed(el.id);
    removeTaskFromHTML(checkID);
    removeTaskFromCache(tempIndex);
    console.log(tempIndex);
    return tempIndex;
}

function saveTaskOnCache(data) {
    index++; taskNameOnCache = `task-${index}`;
    localStorage.setItem(taskNameOnCache, data.value); // Save task data on Cache
}

function printTaskOnHTML(task) {
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
    localStorage.removeItem(`task-${tempIndex}`);
}

function removeTaskFromHTML(checkID) {
    const elementButton = document.getElementById(checkID); // Get the exact ID of the button (and paragraph) to be deleted.
    const elementParagraph = elementButton.parentNode; // Get the parent ID of the button, which should be the paragraph ID.
    elementParagraph.parentNode.removeChild(elementParagraph); // Delete the paragraph, which also deletes the button.
}

function createButtonDelete(tempIndexID) {
    if (tempIndexID) {
        const buttonDelete = document.createElement('button'); // Create a button element.
        buttonDelete.innerHTML = "Deletar"; // Give an HTML to it.
        buttonDelete.id = `buttonDelete${tempIndexID}`; // Give an ID to it.
        buttonDelete.className = `buttonDelete`;    // Give a class to it.
        return buttonDelete;    // return the button element with the desired characteristics.
    }
    else { // Use the global variable "idCount" when no argument is given.
        const buttonDelete = document.createElement('button'); // Create a button element.
        buttonDelete.innerHTML = "Deletar"; // Give an HTML to it.
        buttonDelete.id = `buttonDelete${idCount}`; // Give an ID to it.
        buttonDelete.className = `buttonDelete`;    // Give a class to it.
        return buttonDelete;    // return the button element with the desired characteristics.
    }
}

function createParagraph(buttonDelete, data, tempIndexID) {
    if (tempIndexID) {
        const paragraph = document.createElement("P"); // Create a paragraph.
        paragraph.id = `paragraph${tempIndexID}`;   // Give an ID to it.
        paragraph.innerHTML = data; // Give an HTML to it.
        paragraph.appendChild(buttonDelete); // Add a button to it.
        taskList.appendChild(paragraph); // Add the paragraph to the taskList window.
    }
    else {
        const paragraph = document.createElement("P"); // Create a paragraph.
        paragraph.id = `paragraph${idCount}`;   // Give an ID to it.
        paragraph.innerHTML = data; // Give an HTML to it.
        paragraph.appendChild(buttonDelete); // Add a button to it.
        taskList.appendChild(paragraph); // Add the paragraph to the taskList window.
    }

}

function counting() {
    idCount++;
}

function findButtonPressed(elID) {
    let tempIndex = 0; let checkID = `buttonDelete${tempIndex}`;
    while (elID != checkID) { // Search for the exact ID.
        tempIndex++;
        checkID = `buttonDelete${tempIndex}`;
    }
    return [checkID, tempIndex]; // Return the right ID and Index.
}

function refreshHTMLnCache(tempIndexfnc) {
    while(localStorage.getItem(`task-${tempIndexfnc+1}`)) { // While exists NextTask, keep reorganizing it.
        let tempButtonDelete = createButtonDelete(tempIndexfnc); // Create button equal of deleted task button.
        let tempTaskName = `task-${tempIndexfnc}`; // Name the task equally as the deleted task.
        let tempNextTaskValue = localStorage.getItem(`task-${1+tempIndexfnc}`); // Get info of NextTask.
        createParagraph(tempButtonDelete, `${tempNextTaskValue} `, tempIndexfnc); /* Create again the paragraph of deleted task
        but now containing info from the nextTask. */
        localStorage.setItem(tempTaskName, tempNextTaskValue); // Save on Cache the NextTask in the pace of DeletedTask.
        tempButtonDelete = createButtonDelete((tempIndexfnc+1)); // Get ID of NextTask.
        deleteTask(tempButtonDelete); // DeleteNext task.
        tempIndexfnc++;
    }
}

function initPage() {
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
        tempIndex = -1; // Otherwise, Index is -1 meaning there is no index on cache yet.
        return [tempIndex, tempTaskNameOnCache]; // Return initialized Index and TaskName.
    }
}

