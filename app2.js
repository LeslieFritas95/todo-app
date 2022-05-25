
//3)

const BASE_URL = 'https://62860d1bf0e8f0bb7c0f42a9.mockapi.io/todos'
//const BASE_URL =  'https://62877c5ae9494df61b3a03c2.mockapi.io/todos'


//4)
let todosArray = [];

function goToTodoPage(id){
    let urlString = "/todo.html"
    if(id){
        urlString = urlString + '?id=' + id;
    }
    window.location.href = urlString ;
}

// function goToTodoPage2(todo){
//     let urlString = "/todo.html"
//     if(todo){
//         const todoString = JSON.stringify(todo); 
//        sessionStorage.setItem('selectedTodo', todoString);
//     }
//     window.location.href = urlString ;
// }


function populateTagContainer(container, tags){
    for (const tag of tags) {
        const span = document.createElement('span');
        span.classList.add('tag');
        const node = document.createTextNode('#' + tag);
        span.appendChild(node);  
        container.appendChild(span);
    }
}

function createTodoCard(todo){

    const cardTemplate = `
    <span class="todo-name">#NAME</span>
    <div class="tag-container"></div>
    <span>#CREATIONDATE</span>
    <div class="divider"></div>
    <div class="button-container">
        <button class="delete-button"><img width="23px" src="./assets/./delete-button.png"></button>
        <button class="edit-button"><img width="23px" src="./assets/./edit.png"></button>
        <button class="done-button"><img width="23px" src="./assets/./add.png"></button>
    </div>`
    

    // const humanDate = new Date(todo.cretionDate * 1000)
    const todoHtml = cardTemplate.replace("#NAME", todo.name)
                                 .replace("#CREATIONDATE", todo.creationDate)
    return todoHtml;
}

function startLoading(){
    const loader = document.getElementById('loader')
    loader.style.display = 'inline-block'
    const refresh = document.getElementById('refresh-button');
    refresh.style.display = 'none';
}

function stoptLoading(){
    const loader = document.getElementById('loader')
    loader.style.display = 'none'
    const refresh = document.getElementById('refresh-button');
    refresh.style.display = 'inline-block';
}

//6)eliminare todos
function filterTodos(t1, t2){
    return t1.id !== t2.id;
}

//5)
function removeTodoAndRefesh(todo){
    stoptLoading();
    todosArray = todosArray.filter(t1 => filterTodos(t1, todo))
    displayTodos(todosArray);
}

//3)
function deleteTodo(id){
    startLoading();
    const deleteUrl = BASE_URL + '/' + id;
    const fetchOptions = { method: 'delete'};
    fetch(deleteUrl, fetchOptions)
    .then(response => response.json())
    .then(result => removeTodoAndRefesh(result))
                    //console.log('delete', result)
    .catch(error = stoptLoading())
    //console.log('delete', id) log per vedere se funziona
}

function getTodo(id){
    startLoading();
    const getUrl = BASE_URL + '/' + id;
    const fetchOptions = { method: 'get'};
    fetch(getUrl, fetchOptions)
    .then(response => response.json())
    .then(result => removeTodoAndRefesh(result))
                   
    .catch(error = stoptLoading())
}

function editTodo(todo){
    console.log(todo)
}

//2)
function displayTodos(todos){
    const todosContainer = document.getElementById('todos-container') 

    //console.log
    todosContainer.innerHTML = '';
    const sortedTodo = todos.sort(function(a, b){
        if(a.priority.order > b.priority.order) { return -1; }
        if(a.priority.order < b.priority.order ) { return 1; }
        return 0;
    })

    for (const todo of sortedTodo) {

        const todoCard = document.createElement('div');
        todoCard.classList.add('todo-card');

        todoCard.innerHTML = createTodoCard(todo);

        const tagContainer = todoCard.querySelector('.tag-container');

        populateTagContainer(tagContainer, todo.tags);

        const deleteButton = todoCard.querySelector('.delete-button');
        deleteButton.onclick = () => {
            const confirmText = prompt('Scrivi "elimina" per confermare');
            if(confirmText === "elimina"){
                deleteTodo(todo.id);
            }
        }

        const editButton = todoCard.querySelector('.edit-button');
        editButton.onclick = () => goToTodoPage(todo.id);

        const divider = todoCard.querySelector('.divider');
        divider.style.backgroundColor = todo.priority.color;

        // const span = document.createElement('span');
        // const nameNode = document.createTextNode(todo.name);
        // span.appendChild(nameNode);

        // todoCard.appendChild(span);

        // const button = document.createElement('button');
        // //passiamo le info al bottone per creare il delete
        // button.onclick = () => deleteTodo(todo.id)
        // const deleteNode = document.createTextNode('delete');
        // button.appendChild(deleteNode);

        // todoCard.appendChild(button);

        todosContainer.appendChild(todoCard);

    }
}

//4)
function initTodos(todos){
    stoptLoading();
    // console.log('init',todos)
    todosArray = todos.map(obj => Todo.fromDbObj(obj));
    displayTodos(todosArray);
}

//1)
function loadTodos(){
    startLoading()
    fetch(BASE_URL)
    .then(response => response.json())
    .then(result => initTodos(result))
                  //displayTodos(result)
                  //console.log(result) 2)
    // .catch(error =>stoptLoading())
}

loadTodos();



