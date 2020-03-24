class Task {

    constructor(id, name, importance, assign, desc, date){
        this.id = id; 
        this.name = name; 
        this.importance = importance; 
        this.assign = assign; 
        this.desc = desc; 
        this.date = date; 
    }
}

/**------------------------------------------------------------------------------------------------- */

class UI {
    static displayTasks() {
        var tasks = [
            {
                id: 1, 
                name: 'Do programming homework',
                importance: 'High', 
                date: '11/22/1963'
            }, 
            {
                id: 2, 
                name: 'Do writing homework',
                importance: 'Medium', 
                date: '13/04/2001'
            }, 
            {
                id: 3, 
                name: 'Go in for gym', 
                importance: 'Low', 
                date: '11/01/2020'
            }
        ]; 

        tasks.forEach((task)=>{
            UI.appendRow(task.id, task.name, task.importance, task.date); 
            //console.log(task.date);   
        }); 
    }

    static addTask(id, name, importance, date) {
        if(id==='' || name === '' || importance === '' || date === ''){
             UI.showAlert('Please fill in all the indicated fields', 'danger');
        }
        else{
            var task = new Task(id, name, importance, date);
        
            UI.appendRow(id, name, importance, date); 
            this.clearFields(); 

            this.showAlert('Task succesfully added', 'success'); 
        }
    }

    static appendRow(id, name, importance, date){
        var row = document.createElement('tr');
        row.innerHTML = `<td>${id}</td>
        <td>${name}</td>
        <td>${importance}</td>
        <td>${date}</td>
        <td><a href = "#"><i class="fas fa-trash delete"></i></a></td>
        `; 

        var tbody = document.getElementById('tbody'); 
        tbody.appendChild(row);  
    }

    static deleteTask(e){
        if(e.classList.contains('delete')){
            e.parentElement.parentElement.parentElement.remove(); 
        }

        this.showAlert('Task deleted successfully', 'success'); 
    }

    static clearFields(){ 
        document.getElementById('id').value =''; 
        document.getElementById('name').value; 
        document.getElementById('importance').value; 
        document.getElementById('date').value; 
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
}

/**----------------------------------------------------------------------------------------------------- */

document.getElementById('add-task-form').addEventListener('submit', (e)=>{
    e.preventDefault(); 

    var id = document.getElementById('id').value; 
    var name = document.getElementById('name').value; 
    var importance = document.getElementById('importance').value; 
    var date = document.getElementById('date').value; 

    UI.addTask(id, name, importance, date); 
    console.log();
})

document.addEventListener('DOMContentLoaded', UI.displayTasks()); 

document.querySelector('#tasks').addEventListener('click', (e)=> {
    UI.deleteTask(e.target); 

}); 



