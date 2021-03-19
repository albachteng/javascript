// codesmith.io recursion lecture notes and code samples

// recursion enables writing more intuitive, declarative and maintainable code
// reduces complexity of iterative code by 
// describing WHAT we want, not HOW we want to get it

// principles of javascript
// (single) thread of execution - top to bottom, left to right, line-by-line
// memory - store of data ('variable environment')
// functions - special sets of code we save and can use later on 
// call stack - keeps track of the context our thread of execution is running in
// also tells us where the context was created AND
// generates a local environment for storing data specific to the active context

// 1. initial value      --> input
// 2. breaking condition --> base case
// 3. update expression  --> recursive case

// declare a function with the label sumNaturals 
// and save the function body to that lavel in global memory
// evaluated result of calling sumNaturals with an argument 3
// to evaluate that result, we need to add sumNaturals(3) to the callstack
// and we'll need a global execution context for sumNaturals(3)
// thread of execution enters function context for sumNaturals(3)

// in local memory we save 3 as argument to the label n
// we declare a new variable in local memory called result and instantiate it equal to zero
// when we reach the keyword while we check the breaking condition (n >= 1)
// since 3 >= 1 evaluates to true, we enter the while loop's body
// result is reassigned to the value of 0 + 3
// n is reassigned to the value 3 - 1 = 2
// back to the top of the while loop, we check the breaking condition again (n>=1)
// since 2 >= 1 evaluates to true, we enter the while loop's body again
// result is reassigned to the value 3 + 2 = 5;
// n is reassigned to n - 1 = 1; 
// etc.

// while loops do have their own local execution contexts

// 1. initial value      --> input
// 2. breaking condition --> base case
// 3. update expression  --> recursive case

// ask: "how is this task self-similar?"
// handle some small part of the overall task and then make a recursive call to handle the result
// -> this is called "decomposition"

// tail recursion - setting a default parameter