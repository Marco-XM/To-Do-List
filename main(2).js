function addToDo(){
    let inputValue = document.getElementById('todo');    
    saveToLocalStorage();
    displayLocalStorage();
    inputValue = '';
}


function saveToLocalStorage() {
    let inputValue = document.getElementById('todo').value;
    let storedValue = localStorage.getItem('Task-ID');
    let values = storedValue ? JSON.parse(storedValue) : [];
    values.push({id: generateId(), text: inputValue});
    window.localStorage.setItem('Task-ID', JSON.stringify(values));
}

function removeTask(taskId) {
    let storedValue = localStorage.getItem('Task-ID');
    let values = storedValue ? JSON.parse(storedValue) : [];
    
    values = values.filter(task => task.id !== taskId);
    
    localStorage.setItem('Task-ID', JSON.stringify(values));
    
    displayLocalStorage();
    
}

function displayLocalStorage() {
        let tasksHolder = document.getElementById('task-holder');
        let storedValue = window.localStorage.getItem('Task-ID');
        let values = storedValue ? JSON.parse(storedValue) : [];
        tasksHolder.innerText = '';
        
        values.forEach(task => {
            let div = document.createElement('div');
            div.style = "display: flex; justify-content: space-between; flex-direction: row;";
            div.innerText = task.text;
            
            let removeBtn = document.createElement('button');
            removeBtn.style = "background-color: red; color: white; border: none; padding: 10px; border-radius: 10px; cursor: pointer;"
            removeBtn.classList.add('value', task.id);
            removeBtn.innerText = 'Remove';
            removeBtn.onclick = () => removeTask(task.id);
            
            div.appendChild(removeBtn);
            tasksHolder.appendChild(div);
        });
    }
    window.onload = displayLocalStorage();
    
    
    
    
function generateId() {
    return '0x' + Math.random().toString(36).substr(2, 9);
}