// Check if storage data by HTML5 is available.
checkstorageID = typeof Storage;
if (checkstorageID === "undefined") {
    alert("Your browser does not provide Web Storage by HTML5");
    throw new Error ("Storage not available");
}

const form = document.querySelector('.form');
const send = document.querySelector('.send');
const tarefas = document.querySelector('.tarefas')
const listaTarefas = document.querySelector('.listaTarefas');
const button = document.createElement("button");
button.innerHTML = "Deletar";
let storageData;

document.addEventListener('click', function(e) {
    const elementID = e.target;

if (elementID.classList.contains('send')) {
    listaTarefas.innerHTML += `${tarefas.value}  `;
    listaTarefas.appendChild(button);
    listaTarefas.innerHTML += "<br>";
    localStorage.storageData += `${tarefas.value}  `;
    console.log(localStorage.storageData); //na hr de ler o que foi guardado aparece uns negocio mt loko.
}

})