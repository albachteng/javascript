





const euler2 = function() {
    let numbers = [1, 2];
// start with a brute force approach: calculate the next number
// stop when the last array value is 4000000 or greater
    for (let i = 2; numbers[i - 1] < 4000000; i++) {
        // next number is results index a + resultx index a - 1
        numbers.push(numbers[i - 1] + numbers[i - 2]);
    }
// iterate through the fibonacci numbers: if it is even, push to array
// initialize a counter
    let counter = 0;
    numbers.forEach(value => {
        if (value % 2 == 0) {
            counter+= value;
        }
    })
    return counter; 
}

console.log(euler2());