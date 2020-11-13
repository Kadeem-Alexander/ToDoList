//class that manages lists
const echo = (content) => {
  console.log(content);
}

// creates timer with input in secs
const timer = (sec) => {
  var ms = sec * 1000;
  return new Promise(
    (resolve, reject) => {
      setTimeout(
        ()=>{
          resolve(`timed ${sec} seconds`)
        }
      ,ms)
    }
  );
}

class listManager{
  //add item to list
  //create item structure
  //delete specific item
  //delete all items
  constructor(containerId){
    this._container = document.querySelector("#" + containerId);

    this._list = [];

    //attributes list for contained elements
    this.__item_attributes = [
      ["class", "todo__item"]
    ]
    this.__checkbox_attributes = [
      ["type", "checkbox"],
      ["class", "todo__checkbox"]
    ]
    this.__text_attributes = [
      ["class", "todo__text"]
    ]
    this.__button_attributes = [
      ["class", "todo__deleteBtn"],
      ["tabindex", "0"]
    ];
    this._webstorageName = containerId + "_store";

    //check if web storage exists
    this.createWebStrorage();

    //this.addSingleDeleteEvent()
  };

  create_And_Update(val){
    this.createItem(val);
    this.updateList(val);
  }
  createItem(text){
    //create item box and add its attributes
    let item = itemCreator("li", this.__item_attributes);

    //create checkbox item, add attributes append it to item
    let itemCheckbox = itemCreator("input", this.__checkbox_attributes);
    item.appendChild(itemCheckbox);

    //create text item  add attributes and add text node and append it to item
    let itemText = itemCreator("p", this.__text_attributes);
    let itemData = document.createTextNode(text);
    itemText.appendChild(itemData);
    item.appendChild(itemText);

    //create button item and append it to item
    let itemButton = itemCreator("button", this.__button_attributes);
    itemButton.textContent = "x";
    item.appendChild(itemButton);

    //add item to end of list container and add events
    this.addItem(item);
    return;
  }
  addItem(el){
    //adds items to the end of the list
    this._container.appendChild(el);
    //adds an event listener
    this.addSingleDeleteEvent();

    return;
  }

  addSingleDeleteEvent(){
    //get element reference
    let lastEl = this._container.lastElementChild;
    for(var i = 0; i < lastEl.children.length; i ++){
      if(lastEl.children[i].classList.contains("todo__deleteBtn")){
        lastEl.children[i].addEventListener("click", evt=>{
          //get that element
          var myParent = evt.target.parentNode;
          //get its position in the array
          var myParentIndex = Array.prototype.indexOf.call(
            this._container.children,
            myParent,
          )
          //delete it from our list and webstorage
          this._list.splice(myParentIndex, 1);
          this.updateWebstorage();

          //delete it from dom
          myParent.remove();
        })
      }
    };
    return;
  }

  deleteAll(){
    //remove all children from container
    while(this._container.lastElementChild){
      this._container.removeChild(this._container.lastElementChild);
    }
    //remove all items from list
    this.clearList();
    this.updateWebstorage();
  }

  updateList(text){
    this._list.push(text);
    this.updateWebstorage();
    return;
  }
  clearList(){
    this._list.splice(0, this._list.length);
  }
  displayList(){
    echo(this._list);
  }

  createWebStrorage(){
    //create webstorage if it does not exist
    if(!localStorage.getItem(this._webstorageName)){
      localStorage.setItem(this._webstorageName, "");
      return;
    }
    //else fetch webstorage
    else{
      this.fetchWebstorage();
    }
  }
  updateWebstorage(){
    //update data stored in web storage
    let deleteWS = new Promise(
      (resolve, reject) => {
        localStorage.removeItem(this._webstorageName);
        if(localStorage.getItem(this._webstorageName)){
          reject("failed to update")
        }else{
          resolve("deleted web storage");
        }
      }
    )

    deleteWS.then(
      (msg) => {
        localStorage.setItem(this._webstorageName, this._list);
      }
    );
    return;
    // localStorage.setItem(this._webstorageName, this._list);
  }
  fetchWebstorage(){
    //set list from web storage and split
    let unsplitList = localStorage.getItem(this._webstorageName);
    this.clearList();
    this._list = unsplitList.split(",");
    
    //display saved list;
    this.displaySavedList();
  }
  displaySavedList(){
    //take the items in the item store
    for(var i = 0; i < this._list.length; i++){
      this.createItem(this._list[i]);
    }
  }
  //debug to check what is in the webstorage at a given time  
  diplayWebstorageContent(){
    let webValue = localStorage.getItem(this._webstorageName);
    echo(webValue);
    return;
  }

  

}

function itemCreator(el, el_attributes = []){
  //creates element and attaches attributes
  let thisEl = document.createElement(el);
  if(el_attributes.length === 0){
    //return empty element
    return thisEl;
  }else{
    //add attributes ten return element
    for(var i = 0; i < el_attributes.length; i++){
      thisEl.setAttribute(el_attributes[i][0], el_attributes[i][1]);
    }
    return thisEl;
  }

}
