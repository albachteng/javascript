// notes from codesmith lecture / workshop

/* closure is one of the most esoteric of javascript concepts - 
developers often don't understand it even as they use it.
enables powerful pro-level functions like 'once' and 'memoization'
a lot of js design patterns including the module pattern use closure
build iterators and maintain state in an asynchronous world */ 

// codewars, web dev simplified, frontend masters, leetcode 

function outer() {
    let counter = 0;
    function incrementCounter() {
        console.log(counter++);
    }
    return incrementCounter;
}

const myNewFunction = outer();
myNewFunction();
myNewFunction();

const anotherFunction = outer(); 
anotherFunction();
anotherFunction();