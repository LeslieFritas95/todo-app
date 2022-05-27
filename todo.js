// console.log('sono todo js', window.location.href)

// function parseUrlParams(){
//     const url = window.location.href;
//     const urlArray = url.split('?');
//     const paramsString = urlArray[1];
//     if(paramsString){
//         const paramsArray = paramsString.split('&');
//         const paramsObjt = {};
//         for (const str of paramsArray) {
//             console.log('stringa parametro', str)
//             const strArray = str.split('=')
//             console.log('array del parametro', strArray)
//             paramsObjt[strArray[0]] =  decodeURIComponent(strArray[1]);
//         }
//         console.log('paramsObj', paramsObjt)
//     }else{
//         return null;
//     }
// }
const BASE_URL = 'https://62860d1bf0e8f0bb7c0f42a9.mockapi.io/todos';


let selectedTodo = new Todo('new Todo');

const params = parseUrlParams();

function todoApp(){
    window.location.href = './'
}

function goHome() {
    window.location.href = './'
}
  
  function parseUrlParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
    //console.log('params', params);
}
  
  function changeTitle() {
    const pageTitle = document.getElementById('page-title');
    pageTitle.innerHTML = 'Modifica Todo'
}
  
  function loadSelectedTodo(id) {
    const todoUrl = BASE_URL + '/' + id;
    fetch(todoUrl)
    .then(resp => resp.json())
    .then(result => initiSelectedTodo(result));
}
  
  function initiSelectedTodo(obj){
    const todo = Todo.fromDbObj(obj);
    selectedTodo = todo;
    fillForm(selectedTodo);
}
  
  function colorTags(selectedTags){
    const tags = document.getElementsByClassName('tag');
    for (const tagSpan of tags) {
      if (selectedTags.includes(tagSpan.innerHTML)) {
        tagSpan.style.backgroundColor = 'crimson';
      } else {
        tagSpan.style.backgroundColor = '#414141';
      }
    }
}
  
  function colorPriority(priority){
    const priorities = document.getElementsByClassName('priority');
    for (const prioritySpan of priorities) {
      if (priority.name === prioritySpan.innerHTML) {
        prioritySpan.style.backgroundColor = priority.color;
      } else {
        prioritySpan.style.backgroundColor = '#414141'
      }
    }
}
  
  function addOrRemoveTag(tag){
    if (selectedTodo.tags.includes(tag)) {
      selectedTodo.tags = selectedTodo.tags.filter(t => filterTags(t, tag));
    } else {
      selectedTodo.tags.push(tag);
    }
    colorTags(selectedTodo.tags);
}
  
  function changePriority(priority) {
    selectedTodo.priorityOrder = priority;
    colorPriority(selectedTodo.priority);
}
  
  function filterTags(t1, t2){
    return t1 !== t2;
}
  
  function fillForm(todo){
    const nameInput = document.getElementById('name-input');
    nameInput.value = todo.name;
    colorTags(todo.tags);
    colorPriority(todo.priority);
}

function saveTodo(){
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();
  
    if (name) {
      selectedTodo.name = name;
      const dbObj = selectedTodo.toDbObj();
      const dbObjJson = JSON.stringify(dbObj);
      let url;
      let fetchOptions;
      if (params.id) {
        url = BASE_URL + '/' + params.id;
        fetchOptions = {
          method: 'PUT', body: dbObjJson, headers: {
            'Content-Type': 'application/json'
          }
        };
      } else {
        url = BASE_URL;
        fetchOptions = {
          method: 'post', body: dbObjJson, headers: {
            'Content-Type': 'application/json'
          }
        };
      }
      fetch(url, fetchOptions)
        .then(resp => resp.json())
        .then(res => goHome())
    } else {
      alert('non posso savare un todo senza nome')
    }
  }
  
  
  
  if (params.id) {
    changeTitle()
    loadSelectedTodo(params.id)
  } else {
    fillForm(selectedTodo);
  }
  
  
  
// function getTodo(id){
//     const getUrl = BASE_URL + '/' + id;
//     const fetchOptions = { method: 'get'};
//     fetch(getUrl, fetchOptions)
//     .then(response => response.json())
//     .then(result => editTodo(result))
//     .catch(error => console.log(error))
// }

// function editTodo(todo){
//     document.getElementById("todo-name").value = todo.name
//     document.getElementsByClassName("priority").
//     console.log(todo)
// }

// const params = parseUrlParams();
// console.log(params);

// getTodo(params.id)




// function getTodoFromSessionStorage(){
//     const todoString = sessionStorage.getItem('selectedTodo');
//     if(todoString){
//         const todo = JSON.parse(todoString);
//         console.log('todo', todo)
//     }

// }

// getTodoFromSessionStorage()
// parseUrlParams()