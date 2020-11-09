//import listManager from 'todo.manager.js';

//object with the structure of our specific list content
let itemContent = (text) => {
  let listTextNode = document.createElement("p");
  listTextNode.setAttribute("class", "todo__text center__content");
  let listTextNodeContent = document.createTextNode(text);
  listTextNode.appendChild(listTextNodeContent);

  let listDeleteBtn = document.createElement("p");
  listDeleteBtn.setAttribute("class","delete__text center__content");
  listDeleteBtn.appendChild(document.createTextNode("x"));

  return [listTextNode, listDeleteBtn];
}

window.onload = e => {
  let todoManager = new listManager("todo__list", "todo__item", "delete__text");
  const TODO_FORM = document.querySelector("#task-add-form");
  const TASK_INPUT = document.querySelector("#task-add-input");

  const DELETE_TASKS_BTN = document.querySelector("#delete-all-btn");

  TODO_FORM.addEventListener("submit", evt => {
    evt.preventDefault();
    if(TASK_INPUT.value.length != ""){
      todoManager.add(itemContent(TASK_INPUT.value));
    }else{
      //error handler for empty container.
    }
  });

  DELETE_TASKS_BTN.addEventListener("click", evt => {
    evt.preventDefault();
    todoManager.deleteAll();
  })
}