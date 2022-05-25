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

function parseUrlParams(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params
}

const params = parseUrlParams();
console.log(params);

// function getTodoFromSessionStorage(){
//     const todoString = sessionStorage.getItem('selectedTodo');
//     if(todoString){
//         const todo = JSON.parse(todoString);
//         console.log('todo', todo)
//     }
   
// }

// getTodoFromSessionStorage()
// parseUrlParams()