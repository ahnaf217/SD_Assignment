const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const deleteAllButton = document.querySelector(".delete-all");

function addTask(){
    if(inputBox.value === ''){
        alert("Please enter a task");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let deleteButton = document.createElement("span");
        deleteButton.innerHTML = "\u00d7";
        deleteButton.style.cursor = 'pointer';
        
        let editButton = document.createElement("Edit");
        editButton.innerHTML = "Edit";
        editButton.className = "edit-btn";
        
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        
        saveData();
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    else if(e.target.tagName === "BUTTON" && e.target.classList.contains("edit-btn")){
        let li = e.target.parentElement;
        let currentText = li.firstChild.textContent;
        let newText = prompt("Edit your task:", currentText);
        if(newText !== null && newText !== ''){
            li.firstChild.textContent = newText;
            saveData();
        }
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    let editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(button => {
        button.addEventListener("click", function(e){
            let li = e.target.parentElement;
            let currentText = li.firstChild.textContent;
            let newText = prompt("Edit your task:", currentText);
            if(newText !== null && newText !== ''){
                li.firstChild.textContent = newText;
                saveData();
            }
        });
    });
}

showTask();

deleteAllButton.addEventListener("click", () => {
    listContainer.innerHTML = "";
    saveData();
});
