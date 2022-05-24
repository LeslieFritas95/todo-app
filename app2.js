
//3)

const BASE_URL = 'https://62860d1bf0e8f0bb7c0f42a9.mockapi.io/todos'


//4)
let todosArray = [];

function goToTodoPage(){
    window.location.href = "/todo.html/"
}

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
    <div  class="button-container">
        <button class="delete-button"><img width="20px" src="./assets/delete_FILL0_wght400_GRAD0_opsz48.png"></button>
        <button class="edit-button"><img width="20px" src="./assets/edit_FILL0_wght400_GRAD0_opsz48.png"></button>
        <button class="done-button"><img width="20px" src="./assets/add_FILL0_wght400_GRAD0_opsz48.png"></button>
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

//2)
function displayTodos(todos){
    const todosContainer = document.getElementById('todos-container') 

    //console.log
    todosContainer.innerHTML = '';

    for (const todo of todos) {

        const todoCard = document.createElement('div');
        todoCard.classList.id('todo-card');

        todoCard.innerHTML = createTodoCard(todo);

        const tagContainer = todoCard.querySelector('.tag-container');

        populateTagContainer(tagContainer, todo.tags);

        const deleteButton = todoCard.querySelector('.delete-button');
        deleteButton.onclick = () => deleteTodo(todo.id);

        const divider = todo.querySelector('.divider');
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
    console.log('init',todos)
    todosArray = todos;
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