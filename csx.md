# CSX preparation for coding interview

keywords var / let / const create (or *instantiate*) a variable
"=" is the *assignment operator* and allows you to *assign value* to the variable

changing variables value is called *reassignment*

naming conventions... camelCase, don't start with numbers, no non-alphanumeric symbols

## Data Types

*composite* data types: arrays, objects

*primitives* include strings, numbers, booleans, null, undefined and symbol 

! primitive data types are *immutable* 

## strings

strings with backticks allow the use of *template literals

escape sequences (strings) = \ before reserved characters like quotes \n newline, etc

## floats

NTS gotta look this up more, limitations of binary representing real decimal numbers... 

## assignment operators

++ incrementer 
-- decrementer 

assignment operator works with all the basic arithmetic functions
+= addition assignment operator
-= subtraction ""
*= multiplication ""
/= division ""

## boolean (comparison) operators

watch out for type coercion with the loose equality operator

## typeof operator
exactly like it says on the tin 
not accessed using dot notation - put it in front of the item you want to test
i.e. typeof obj[key] == 'number'; etc.

## arrays
length property
bracket notation
push method (like in a queue, adds to the end)
pop method (removes from the end)


## for loops
for (declare incrementer/decrementer; conditions for continuing to loop; what to do after each iteration)

## while loop
"JavaScript's *thread of execution* will repeatedly process the code block until the while loop's conditional expression evaluates to false (watch out for loops)"

## control flow / if-else statements
watch out for else statements - that code executes only if the immediately preceding if statement condition evaluates to false

## for... in loops (objects) and Object.keys()
don't forget to declare the variable you choose as the iterable
i.e. for (let key in checkObj) 

## Functions, Execution Context, Call Stack
