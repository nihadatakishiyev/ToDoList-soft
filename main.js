class Task {

    constructor(id, name, importance, assign, date){
        this.id = id; 
        this.name = name; 
        this.importance = importance; 
        this.assign = assign; 
        this.date = date; 
    }
}

/**------------------------------------------------------------------------------------------------- */

class UI {
    static displayTasks() {
        let tasks = Store.getLocalTasks(); 

        tasks.forEach((task)=>{
            UI.appendRow(task.id, task.name, task.importance, task.assign, task.date); 
        }); 
    }

    static addTask(id, name, importance, assign, date) {
        if(id==='' || name === '' || importance === '' || date === '' || assign === ''){
             UI.showAlert('Please fill in all the indicated fields', 'danger');
            
        }
        else{
            var task = new Task(id, name, importance, assign, date);
        
            UI.appendRow(id, name, importance, assign, date); 
            Store.setLocalTask(task); 
            this.clearFields(); 

            this.showAlert('Task succesfully added', 'success'); 
        }
    }
 
    static appendRow(id, name, importance, assign, date){
        var row = document.createElement('tr');
        row.innerHTML = `<td class = "tid">${id}</td>
        <td>${name}</td>
        <td>${importance}</td>
        <td>${assign}</td>
        <td>${date}</td>
        <td><a href = "#"><i class="fas fa-trash delete"></i></a></td>
        <td><a href = "#"><i class="fas fa-pencil-alt"></i></a></td>
        `; 

        var tbody = document.getElementById('tbody'); 
        tbody.appendChild(row);  
    }

    static deleteTask(e){
        if(e.classList.contains('delete')){
            e.parentElement.parentElement.parentElement.remove(); 
            this.showAlert('Task deleted successfully', 'success'); 
        }    
    }

    static clearFields(){ 
        document.getElementById('id').value = ''; 
        document.getElementById('name').value= ''; 
        document.getElementById('importance').value = ''; 
        document.getElementById('assign').value = ''; 
        document.getElementById('date').value = ''; 
    }

    static showAlert(message, type){
        var form = document.getElementById('add-task-form'); 
        var row = document.getElementById('frow'); 

        var alert = document.createElement('div'); 
        alert.className = `alert alert-${type}`; 
        alert.appendChild(document.createTextNode(message));  

        form.insertBefore(alert, row); 

        setTimeout(() => {
            document.querySelector('.alert').remove(); 
        }, 3000);
    }

    static filterTasks(text) {
        let tasks = document.getElementById('tbody'); 
        let trs = tasks.getElementsByTagName('tr'); 
        
        Array.from(trs).forEach((tr)=>{
            let tname = tr.firstElementChild.nextElementSibling.textContent; 
            if(tname.toLowerCase().indexOf(text)!=-1){
                tr.style.display = 'table-row'; 
            }
            else {
                tr.style.display = 'none'; 
            }
        })
    }
}

/**----------------------------------------------------------------------------------------------------- */

class Store {
    static getLocalTasks(){
        let tasks = localStorage.getItem('tasks') ?
        JSON.parse(localStorage.getItem('tasks')) : []; 
        
        return tasks; 
    }

    static setLocalTask(task) {
        let tasks = Store.getLocalTasks(); 
        
        tasks.push(task); 
        localStorage.setItem('tasks', JSON.stringify(tasks));         
    }

    static deleteLocalTask(id) {
        let tasks = Store.getLocalTasks();           

        //remove deleted task from local storage
        tasks.forEach((task, index) => {
            if(task.id === id)
                tasks.splice(index, 1); 
        });

        //assign indexes of tasks again
        tasks.forEach((task, index) => {
            task.id = (index + 1).toString(); 
        });
     
        //change indexes of tasks in UI
        let tids = document.querySelectorAll('.tid'); 
        tids.forEach((tid, index) =>{
            tid.innerHTML = (index+1).toString(); 
        }); 

        //assign renewed task array to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));         
    }
}

/**----------------------------------------------------------------------------------------------------- */

document.getElementById('add-task-form').addEventListener('submit', (e)=>{
    e.preventDefault(); 

    let id = (Store.getLocalTasks().length +1).toString(); 
    let name = document.getElementById('name').value; 
    let importance = document.getElementById('importance').value; 
    let assign = document.getElementById('assign').value; 
    let date = document.getElementById('date').value; 

    UI.addTask(id, name, importance, assign, date); 
})

document.addEventListener('DOMContentLoaded', UI.displayTasks()); 

document.querySelector('#tasks').addEventListener('click', (e)=> {
    let id = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent; 

    UI.deleteTask(e.target); 
    Store.deleteLocalTask(id); 
}); 

document.querySelector('#search').addEventListener('keyup', (e)=>{
    let text = e.target.value.toLowerCase(); 
    
    UI.filterTasks(text); 
}); 

console.log(localStorage.getItem('tasks'));
