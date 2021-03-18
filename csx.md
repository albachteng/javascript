# CSX preparation for coding interview

keywords var / let / const create (or *instantiate*) a variable
"=" is the *assignment operator* and allows you to *assign value* to the variable

changing variables value is called *reassignment*

naming conventions... camelCase, don't start with numbers, no non-alphanumeric symbols

## Data Types

*composite* data types: arrays, objects

*primitives* include strings, numbers, booleans, null, undefined and symbol 

    -> primitive data types are *immutable* 

## strings

strings with backticks allow the use of *template literals*

*escape sequences* = \ before reserved characters like quotes \n newline, etc

## Numbers, floats

NTS gotta read up more on *floats*, limitations of binary representing real decimal numbers... 

## assignment operators

++ incrementer 
-- decrementer 

assignment operator works with all the basic arithmetic functions:
+= *addition assignment operator*
-= subtraction ""
*= multiplication ""
/= division ""

## boolean (comparison) operators

watch out for type coercion with the loose equality operator

## typeof operator
exactly like it says on the tin 
not accessed using dot notation - *put it in front* of the item you want to test
    i.e. typeof obj[key] == 'number'; etc.

## arrays
length property
bracket notation
push method (like in a queue, *adds to the end*)
pop method (*removes from the end*, shift is the option to remove from the beginning and is slow)


## for loops
for (declare incrementer/decrementer; conditions for continuing to loop; what to do after each iteration)

## while loop
"JavaScript's *thread of execution* will repeatedly process the code block until the while loop's conditional expression evaluates to false (watch out for infinite loops)"

## control flow / if-else statements
watch out for *else* statements - that code executes only if the immediately preceding if statement condition evaluates to false

## for... in loops (objects) and Object.keys()
don't forget to *declare* the variable you choose as the iterable
    i.e. for (let key in obj) 

## Functions, Execution Context, Call Stack

what happens when javascript runs code? 

1) thread of execution parses code line by line
2) stores variable values it finds in memory

const num = 3;
function multiplyBy2 (inputNumber) {
    const result = inputNumber * 2;
    return result;
}
const name = "Will"

*(global) memory*: 
    declares constant variable num and sets value to 3 
    declares multiplyBy2 and captures its function body as value
    name is declared and sets value to the string "Will"

also called "*global variable environment*" 

we don't go inside multiplyBy2's function body because it's not called;

As soon as we start running our code, we create a *global execution context*

## the thread in JavaScript
- single threaded: one thing at a time
- synchronous execution (until we introduce async/await)

## running / calling / invoking a function (all the same thing)
NOT the same as defining (or declaring) a function

const output = multiplyBy2(4); __"declare a constant variable 'output' and set it equal to the _evaluated result_ of calling multiplyBy2 with 4 as argument."__

    --> the parentheses tell us that we're not done yet, we'll need a _*local execution context*_
    --> also called a "function level context" 
    --> we *add multiplyBy2(4) to the call stack*

note that JavaScript never leaves a label with no value - *it defaults to undefined*

thread of execution passes to the *local execution context* (local variable environment)

    -> inputNumber (parameter) is set to 4 (argument)
    -> declare result assign it the value of inputNumber * 2 (8)
    -> return the value of the result variable (8)
    -> thread of execution passes back out to global as output variable is set to the value 8
    -> multiplyBy2(4) pops off the call stack

Now we're back in global execution context, we have another variable newOutput being declared set to the evaluated result of calling multiplyBy2 with 10 as argument...

thread of execution passes to the local execution context for multiplyBy2(10) and multiplyBy2(10) is added to the call stack

    -> inputNumber (parameter) is set to 10 (argument)
    -> declare result assign to inputNumber * 2 (20)
    -> return the value of result variable (20)
    -> thread of execution leaves local context and sets newOutput to the value 20;

*Question: how does JavaScript keep track of where it is and to where it needs to return?*

## Answer: the call stack
we never leave the global execution context at bottom - as long as we're running it remains as base
other function calls / local execution contexts are stacked up on top of it

    NTS - stop forgetting to return values from your functions

## function expression v function declaration v arrow function syntax

*function declaration*:
function myFunc (args) {
    //...
}

*function expression*:
const myFunc = function(args) {
    //...
}

*arrow function syntax*: aka concise body syntax
(args) => {
    //... 
}
    -> note that even the brackets could be omitted if you can do it in one line

## higher-order functions and callbacks
*callback*: used as input in another function and called inside of that function
*higher-order function*: takes at least one function as input and/or produces a function as output

const array = [...];

function update(callback) {
    const output = [];
    for (let...) {
        const updated = callback(array[i]);
        output.push(updated); 
    }
}

    --> the above function takes a callback as parameter and performs that callback on each item of the array (it's essentially the Array.map() method). By abstracting the code to accept instructions (another function) as parameter, we avoid unnecessary duplication of code and make it more flexible and concise while being less memory-intensive. 

## reduce and reducer callbacks
- *reduce* array method, when applied to an array, takes a *reducer* callback function and an optional *initialValue* (otherwise defaults to the first element in the array and skips to the second element as currentValue)
- the *reducer function* takes an *accumulator* and the *currentValue* you are working with and *_returns_* the new accumulator

NTS: *_do not forget to return the accumulator at the end of your reducer function_*

## pair programming
    - navigator (explainer) and driver (implementer)
    - improves technical communication and precision
    - don't jump on partner if you believe their approach is incorrect; run the code and see the error so that you have the opportunity to debug together
    - switch the driver / navigation role every 15 minutes

## closure