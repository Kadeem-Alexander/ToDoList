//import listManager from 'todo.manager.js';

window.onload = e => {
  initApp();
}

function initApp(){
  //create to do manager
  const myApp = new listManager("todo__list");

  //if a list exists add it to the list container
  //create add item event
  const addForm = document.querySelector("#task-add-form");
  const formInput = document.querySelector("#task-add-input");
  addForm.addEventListener("submit", evt => {
    evt.preventDefault();
    if(formInput.value == ""){
      //add event handler for empty text
      console.log("cant be empty");
    }
    else{
      myApp.create_And_Update(formInput.value);
      formInput.value = "";
    }
  })
  //create delete all event
  const deleteAllBtn = document.querySelector("#delete-all-btn");
  deleteAllBtn.addEventListener("click", evt=>{
    myApp.deleteAll();
  })

  //dummy data entry
  function dummyEntry(size){
    var counter = 1;
    while (counter <= size && size > 0){
      //cap at 100 items
      if(counter >= 100){
        break;
      }
      var textValue = `todo item ${counter}`
      myApp.createItem(textValue);
      counter++;
    }
    myApp.displayList();
  }

  //dummyEntry(3);
}

