let elTodosForm = document.querySelector("#todos-site-form");
let elTodosInput = document.querySelector("#todos-site-input");
let elTodosList = document.querySelector("#todos-site-list");
let elModalList = document.querySelector("#modal-site-list");
let elTodosId = document.querySelector("#todos-card-header__span");

let todos = [];

let initialId = 0;

function NewTodoPrototype (title, id) {
    this.title = title;
    this.id = id;
}

function addTodo (todoTitle, todoId) {
    todos.push(new NewTodoPrototype(todoTitle, todoId));

    createHTMLTodo(todoTitle, todoId);
    createModalTodo(todoTitle, todoId);
}

function removeTodo(todoId) {
    document.querySelector(`#todo-item-${todoId}`).remove();
    document.querySelector(`#modal-item-${todoId}`).remove()
    elTodosId.textContent = todos.length;

    todos.forEach((todo, i) => {
        if(todo.id === todoId) {
            todos.splice(i, 1);
        }
    });

    console.log(todos);
}

function editTodo(todoId, editIconElementValue) {
    todos.forEach((todo) => {
        if (todo.id === todoId) {
            todo.title = editIconElementValue;
        }
    });
    console.log(todos);
}
function createModalTodo(todoTitle, todoId) {
    let modalLiElement = document.createElement("li");
    modalLiElement.textContent = todoTitle;
    modalLiElement.setAttribute("id", `modal-item-${todoId}`);
    modalLiElement.setAttribute("class", "list-group-item");

    elModalList.appendChild(modalLiElement);
}
function createHTMLTodo (todoTitle, todoId) {
    let todoLiElement = document.createElement("li");
    todoLiElement.setAttribute("id", `todo-item-${todoId}`);
    todoLiElement.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");

    let todoDeletedBtnElement = document.createElement("button");
    todoDeletedBtnElement.textContent = `o'chirish`;
    todoDeletedBtnElement.setAttribute("class", "btn btn-outline-danger");

    todoDeletedBtnElement.addEventListener("click", () => {
        removeTodo(todoId);
    });

    let  editInputElement = document.createElement("input");
    editInputElement.value = elTodosInput.value;
    editInputElement.disabled = true;
    editInputElement.setAttribute("class", "edit-Input");

    todoLiElement.appendChild(editInputElement);

    let  editIconElement = document.createElement("p");
    editIconElement.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    editIconElement.setAttribute("class", "d-flex align-items-center");

    editIconElement.addEventListener("dblclick", ()=> {
        editInputElement.disabled = false;
        editInputElement.focus();
    });

    editInputElement.addEventListener("blur", ()=> {
        if(editInputElement.value.length == 0) {
            editInputElement.disabled = false;
            editInputElement.focus();
            editInputElement.style.borderBottomColor = "red";
        } else {
            editInputElement.style.borderBottomColor = "green";
            editTodo(todoId, editInputElement.value);
        }
    });

    editInputElement.addEventListener("keypress", (e)=> {
        if (e.key === "Enter") {
            editInputElement.disabled = true;
            editTodo(todoId, editInputElement.value);
        }
    });

    todoLiElement.appendChild(editIconElement);

    // let  divInputElement = document.createElement("div");
    // divInputElement.setAttribute("class", "d-flex flex-wrap-reverse align-items-center")
    // divInputElement.appendChild(editIconElement);
    // divInputElement.appendChild(todoDeletedBtnElement);

    // todoLiElement.appendChild(divInputElement);
    

    todoLiElement.appendChild(todoDeletedBtnElement);
    elTodosList.appendChild(todoLiElement);
}



elTodosForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    elTodosId.textContent = todos.length;

    if (elTodosInput.value.length > 0) {
        addTodo(elTodosInput.value, initialId);
        initialId++
    }

    elTodosForm.reset()
    elTodosInput.focus()
    console.log(todos);
})