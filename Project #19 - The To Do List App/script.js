// variable 
const clearBtn = document.querySelector(".clear");
const toDoList = document.querySelector("#list");
const toDoInput = document.querySelector("#input");
const toDoAddBtn = document.querySelector(".fa-plus-circle");

// selecting classes dynamicly (css fil)
const checkBtn = "fa-check-circle";
const uncheckBtn = "fa-circle-thin";
const textLineThrough = "line-through";

// to do container
let toDoContainer, id;

// first localstorege
let toDoData = localStorage.getItem("to-do-item");

if (toDoData) {
  toDoContainer = JSON.parse(toDoData);
  id = toDoContainer.length;
  loadToDoContainer(toDoContainer);
} else {
  toDoContainer = [];
  id = 0;
}

function loadToDoContainer(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
//  Clear the local storage
clearBtn.addEventListener('click' , function(){
    localStorage.clear();
    location.reload();
})

  

// addToDo Function
function addToDo(toDo ,id , done, trash){
    if(trash) return;

  const toDoDone = done ? checkBtn : uncheckBtn;
  const toDoLine = done ? textLineThrough : "";

  const item = `
                <li class="item">
                      <i class="fa ${toDoDone} complete"  status="complete" id="${id}" ></i>
                      <p class="text ${toDoLine}">${toDo}</p>
                      <i class="fa fa-trash-o delete" status="delete" id="${id}"></i>
                </li>
                 `;
    const toDoItemPosition = 'beforeend';
    toDoList.insertAdjacentHTML(toDoItemPosition , item);
}


// adding a to-do list when i presed in to entre key
document.addEventListener("keyup" , displayToDo);

// adding a to-do list when THE icon plus entre
toDoAddBtn.addEventListener("click" ,displayToDo )


// ceating the  displayToDo function()

function displayToDo(event){
    const toDo = input.value;
    if(event.keyCode === 13 || event.target.classList.value === 'fa fa-plus-circle'){
    // cheking the input file it doesnt empty
    if(toDo){
        addToDo(toDo, id , false, false);
        toDoContainer.push({
            name : toDo,
            id:0,
            done:false,
            trash:false,
        });
        id++;
        // updating the localstorage
        localStorage.setItem("to-do-item", JSON.stringify(toDoContainer))
        
    }
    // that for empty string =====
   input.value = "";
}
}
// when a to-do is completed
 function completeToDo(toDoItem){
    toDoItem.classList.toggle(checkBtn);
    toDoItem.classList.toggle(uncheckBtn);
    toDoItem.parentNode.querySelector('.text').classList.toggle(textLineThrough);

    toDoContainer[toDoItem.id].done = toDoContainer[toDoItem.id].done ? false : true;
 }

// when to do is removing
function  removeToDo(toDoItem){
    toDoItem.parentNode.parentNode.removeChild(toDoItem.parentNode)
    toDoContainer[toDoItem.id].trash = true;
}

// targtinig the denamicly creting to-do items
toDoList.addEventListener("click", function (evt) {
if(evt.path[0].localName === "ul" 
|| evt.path[0].localName === "p" ||
 evt.path[0].localName === "li")
  return;

const toDoItem = evt.target;

    const toDostatus = toDoItem.attributes.status.value;
    
    if(toDostatus === 'complete'){
        completeToDo(toDoItem);
    }else if(toDostatus === 'delete'){
        removeToDo(toDoItem);
    }
    localStorage.setItem("to-do-item" , JSON.stringify(toDoContainer))
  });

// fainaly i completed this project 

