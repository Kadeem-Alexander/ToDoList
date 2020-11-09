//class that manages lists
const echo = (content) => {
  console.log(content);
}
class listManager{
  // the listContainer is the class of your list element and the list item is the class of your li element.
  constructor(listContainerClass, listItemClass, deleteItemClass){
    this.listContainerClass = listContainerClass;
    this.listContainerClassSelector = "." + listContainerClass;
    this.listItemClass = listItemClass
    this.listItemClassSelector = "." + listItemClass
    this.deleteItemClass = deleteItemClass;
    this.deleteItemClassSelector = "." + deleteItemClass;

    this.listContainer = document.querySelector(this.listContainerClassSelector);
    this.addDeleteItemEvent();
  }
  // the listItemContent is a variable containing the element of
  // the list item and its structure. can be created using Javascript
  add(listItemContent){
    var li = document.createElement("li");
    li.setAttribute("class", this.listItemClass)

    if(Array.isArray(listItemContent)){
      listItemContent.forEach(element => {
        li.appendChild(element);
      });
    }
    else{
      li.appendChild(listItemContent);
    }
    
    this.listContainer.appendChild(li);
    this.addDeleteItemEvent();
  }

  addDeleteItemEvent(){
    let btns = document.querySelectorAll(this.deleteItemClassSelector);
    
    for(let i = 0; i < btns.length; i++){
      btns[i].addEventListener("click", e => {
        
        if(
          e.target &&
          e.target.classList.contains(this.deleteItemClass)
        ){
          btns[i].parentNode.remove();
        }
      });
    }
  }

  deleteAll(){
    let items = document.querySelectorAll(`${this.listContainerClassSelector} ${this.listItemClassSelector}`);

    items.forEach(item=>{
      item.remove();
    })
  }

}