




const euler1 = function() {
    let results = [];
    // iterate through numbers zero through 1000
    for (let i = 0; i < 1000; i++) {
    // if divisible by 3 or 5, push to results array
        if (i % 3 == 0 || i % 5 == 0) {
            results.push(i);
        }
    }
    // reduce the array by summing them
    return results.reduce((a, b) => a + b);
}

console.log(euler1());