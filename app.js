// grabbing the page elements we will need
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// setting and displaying today's date
let dateOptions = { 
    weekday: 'long',
    month: 'long',
    day: 'numeric'
};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', dateOptions);

// LIST array for saving to-do items
let LIST; // initialized here, becomes an empty array below, eventually populated with objects
let id; // start with id of zero, increment as each item is added

// text and icon modifiers for checking and unchecking items on the list
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// our function for inserting an item to the list
function addToDo(toDo, id, done, trash, heat) {
    if (trash) {return;} // if trash attribute set to true, for some reason, then the item shouldn't be added

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const HEAT = heat ? 'hot' : "";

    const text = 
                `<li class="item ${HEAT}">
                    <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" job="changeHeat" id="${id}">${toDo}</p>
                    <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
                </li>`;

    list.insertAdjacentHTML("beforeend", text);
};

// function for loading the to-do list from local storage
function loadToDo(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash, item.heat);
    });
}

// setting and getting local storage
let data = localStorage.getItem("TODO");
if (data){
    LIST = JSON.parse(data);
    loadToDo(LIST);
    id = LIST.length;
} else {
    LIST = [];
    id = 0;
}

// completing a to-do item
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true; // update LIST array
    LIST[element.id].heat = false; // change heat to false, since the item is complete
    element.parentNode.classList.remove('hot'); // remove hot class on parent node
    localStorage.setItem("TODO", JSON.stringify(LIST)); // update local storage
}

// removing a trashed to-do item
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true; // update trash to true;
    LIST[element.id].heat = false; // update heat to false, since it is trashed
    element.parentNode.classList.remove('hot'); // remove hot class on parent node
    localStorage.setItem("TODO", JSON.stringify(LIST)); // update local storage
}

// add or remove "hot" class from li
function changeHeat(element) {

    if (!LIST[element.id].done) { // if it's not done, we want to allow change to heat
        element.parentNode.classList.toggle('hot');
        } else if (LIST[element.id].heat) { // if heat is already true 
        LIST[element.id].heat = false; // set it to false
    } else if (!LIST[element.id].heat) { // if heat is false
        LIST[element.id].heat = true; // set it to true
    }
    localStorage.setItem("TODO", JSON.stringify(LIST)); // update local storage
};

// event listener for the list 
list.addEventListener('click', function (event) {
    let element = event.target; 
    if (element.attributes.job.value === 'complete') {
        completeToDo(element);
    } else if (element.attributes.job.value === 'delete') {
        removeToDo(element);
    } else if (element.attributes.job.value === 'changeHeat') {
        changeHeat(element); // toggle a 'hot' class to li
    }
})

// adding an item to the list
document.addEventListener("keyup", function(event){
    if (event.code == 'Enter') { // check to see that the keyup was on the enter key
        const toDo = input.value; // save input value to toDo
        if (toDo){ // check to make sure input field is not blank 
            addToDo(toDo, id, false, false, false); // add to the ul element
            LIST.push( // add the item object to the LIST array
                {
                    name: toDo,
                    id: id,
                    done: false, // don't start with it done
                    trash: false, // don't start with it trashed
                    heat: false // starts without heat
                }
            );
            localStorage.setItem("TODO", JSON.stringify(LIST)); // update local storage
        }
        input.value = ""; // clear input field
        id++; // increment id #
}});

// clearing the list and local storage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});
