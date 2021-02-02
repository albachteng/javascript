/* prompt: 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 
without any remainder. What is the smallest positive number that is evenly divisible by 
all of the numbers from 1 to 20? */ 

// we know that 20! would be evenly divisible by all of the numbers 1 - 20 since it is their product
// but that is an astronomical number, so there is doubtless a much smaller solution 
// also many of the numbers 1 - 20 share factors; all even numbers are divisible by 2 for example
// so what we really need to know is what number is the product of all unique factors of the numbers
// in range from 1-20
// so let's write code to factor a number

const factor = (num) => {
    let factors = []; 
    for (i = 3; i < num; i+= 2) { // start at 3 since we can easily assume that 2 is a factor and ignore all even numbers
        if (num % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

console.log(factor(20)); // ignoring 2, which is easy to identify as a factor, we expect 5;
// since 2 * 2 * 5 = 20, we have identified all factors