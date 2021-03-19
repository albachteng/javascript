function fib(n, cache = {"0": 1, "1": 1}) {
    // if cache is not provided, the default value defines our base case
    // if we have the argument n cached, return that value (in constant time!)
    if (cache[n]) return cache[n]; 
    // otherwise, return the value of cache[n] as we...
    // ...assign it the value of two recursive calls to fib
    // we must pass in the cache on each call, otherwise the data... 
    // ... won't be available to help with future calls
    else return cache[n] = fib(n - 1, cache) + fib(n - 2, cache); 
}

let start = Date.now();
console.log(fib(1000)); 
let end = Date.now();
console.log(end - start); // returned in 9 ms!

// at 10000 we get a stack overflow error, not sure what to do with that