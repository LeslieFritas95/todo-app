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
const BASE_URL = 'https://62860d1bf0e8f0bb7c0f42a9.mockapi.io/todos'

function parseUrlParams(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params
}



function getTodo(id){
    const getUrl = BASE_URL + '/' + id;
    const fetchOptions = { method: 'get'};
    fetch(getUrl, fetchOptions)
    .then(response => response.json())
    .then(result => editTodo(result))               
    .catch(error => console.log(error))
}

function editTodo(todo){
    document.getElementById("todo-name").value = todo.name
    document.getElementsByClassName("priority").
    console.log(todo)
}

const params = parseUrlParams();
console.log(params);

getTodo(params.id)




// function getTodoFromSessionStorage(){
//     const todoString = sessionStorage.getItem('selectedTodo');
//     if(todoString){
//         const todo = JSON.parse(todoString);
//         console.log('todo', todo)
//     }
   
// }

// getTodoFromSessionStorage()
// parseUrlParams()