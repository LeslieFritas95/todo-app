const responseCallBack = (response) => response.json();

const catchError = (error) => console.log(error);

const deleteCallback = () => {initApp()}

const resultCallBack = (result) => display(result.map(obj => Todo.fromObj(obj)));


function display (array){
    const container = document.getElementById('card-container');
    container.innerHTML=""
    console.log(array)

    for (const element of array) {
        const card = document.createElement('div');
        card.classList.add('card')

        const nameTodo = document.createElement('p');
        const textTodo = document.createTextNode(element.name);
        nameTodo.appendChild(textTodo);
        card.appendChild(nameTodo);

        for (const tags of element.tags) {
            const tagTodo = document.createElement("span")
            const tagNode = document.createTextNode(tags)
            tagTodo.classList.add("tags")

            tagTodo.appendChild(tagNode)
            card.appendChild(tagTodo)
        }

        const dateTodo = document.createElement("p")
        const dateNode = document.createTextNode(Todo.getFormatteDate(element.creationDate));
        dateTodo.appendChild(dateNode)
        card.appendChild(dateTodo)

        const divTodo = document.createElement("div")
        divTodo.classList.add("div-sep")
        card.appendChild(divTodo)

        const trashButton = document.createElement("button")
        trashButton.classList.add("trash-btn")
        trashButton.onclick = () => deleteTodo(element.id);
        card.appendChild(trashButton)

        const doneButton = document.createElement("button")
        doneButton.classList.add("done-btn")
        card.appendChild(doneButton)

    

        if (element.priority === 0){
            card.style["background"] = "#b5e48c";
            divTodo.style["background"] = "#1C6E8C"
          } else if (element.priority === 1){
            card.style["background"] = "#e9c46a";
            divTodo.style["background"] = "#a3824a"
          } else if (element.priority === 2) {
            card.style["background"] = "#ff9500";
            divTodo.style["background"] = "#ffda80"
          } else if (element.priority === 3) {
            card.style["background"] = "#ff392e";
            divTodo.style["background"] = "#b32620"

          } else {
            card.style["background"] = "#a7a4a4";
            divTodo.style["background"] = "#757374"

          }

        
        container.appendChild(card)
    }
}


function deleteTodo(id) {
    const deleteUrl = 'https://62860d21f0e8f0bb7c0f434d.mockapi.io/todos/' + id;
    const fetchConf = {
        method: 'delete'
    }
    fetch(deleteUrl, fetchConf).then(responseCallBack).then(deleteCallback)
}

const initApp = () => fetch('https://62860d21f0e8f0bb7c0f434d.mockapi.io/todos').then(responseCallBack).then(resultCallBack).catch(catchError);


initApp();