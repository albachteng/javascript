const shoppingList = document.getElementById('shoppingList');
const shoppingListItems = document.querySelectorAll('li');
let i;
for (i = 0; i < shoppingListItems.length; i++) {
    shoppingListItems[i].setAttribute('class', 'cool');
}

function getTarget(e) {
    if (!e) {
        e = window.event;
    }
    return e.target || e.srcElement;
}

function itemDone(e) {
    let target, elParent, elGrandparent;
    target = getTarget(e);
    elParent = target.parentNode;
    elParent.removeChild(target);
}

function changeHeat(e) {
    let target = getTarget(e);
    let itemClass = target.getAttribute('class');
    console.log(itemClass);
    if (itemClass === 'cool') {
        target.setAttribute('class', 'hot');
    } else {
        if (itemClass === 'hot') {
            target.removeAttribute('class');
        } else {
            itemDone(e);
        }
    }}

const el = document.getElementById('shoppingList'); 
if (el.addEventListener) {
    el.addEventListener('click', function(e) {
        changeHeat(e);
    }, false);
} else {
    el.attachEvent('onclick', function(e) {
        changeHeat(e);
    });
}