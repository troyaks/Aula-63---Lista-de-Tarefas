// Check if storage data by HTML5 is available.
checkstorageID = typeof Storage;
if (checkstorageID === "undefined") {
    alert("Your browser does not provide Web Storage by HTML5");
    throw new Error ("Storage not available");
}

const form = document.querySelector('.form');
const send = document.querySelector('.send');
const task = document.querySelector('.task');
const taskList = document.querySelector('.taskList');
const deleteAll = document.querySelector('.deleteAll');
let storageData;
let idArray = [];
let idCount = 0;


document.addEventListener('click', function(e) {
    const elementID = e.target;

if (elementID.classList.contains('send')) {
    if (!task.value || !/\S/.test(task.value)) {
        return;
    }
        localStorage.storageData += `${task.value}  `;
        // taskList.innerHTML += `${task.value}  `;
        const paragraph = document.createElement("P");
        paragraph.id = `paragraph${idCount}`;
        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = "Deletar";
        buttonDelete.id = `buttonDelete${idCount}`; idArray.push(idCount);
        buttonDelete.className = `buttonDelete`; idCount++;
        paragraph.innerHTML = `${task.value}  `;
        paragraph.appendChild(buttonDelete);
        taskList.appendChild(paragraph);
        console.log(localStorage.storageData);
}

if (elementID.classList.contains('deleteAll')) {
    localStorage.clear();
}

if (elementID.classList.contains('buttonDelete')) {
    let checkID;
    let i = 0;
    do {
        checkID = `buttonDelete${i}`;
        i++;
    }
    while (elementID.id != checkID);
    
    removeTask(checkID);
}

function removeTask(checkID) {
    const elementButton = document.getElementById(`${checkID}`);
    elementParagraph = elementButton.parentNode;
    elementParagraph.parentNode.removeChild(elementParagraph);
}
})