/* prompt: 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 
without any remainder. What is the smallest positive number that is evenly divisible by 
all of the numbers from 1 to 20? */ 

// we know that 20! would be evenly divisible by all of the numbers 1 - 20 since it is their product
// but that is an astronomical number, so there is doubtless a much smaller solution 
// also many of the numbers 1 - 20 share factors; all even numbers are divisible by 2 for example
// so what we really need to know is what number is the product of all unique factors of the numbers
// in range from 1-20 (1 * 2 * 3 * 4 * 5 * 7 = 210) hmm
// that doesn't actually work because 210 is not divisible evenly by 4, 8, 9 
// to resolve the discrepency, I noticed we can multiply by 2 again to make it divisible by 4
// multiply it by 2 again to make it divisible by 8 (2^3 = 8)
// multiply it by 3 again to make it divisible by 9 (3^2 = 9)

// so let's write code to factor a number

const factor = (num) => {
    let factors = []; 
    for (i = 2; i < num; i+= 1) { // start at 2
        if (num % i === 0) {
            factors.push(i, num);
            num /= i;
        }
    }
    return factors;
}

console.log(factor(20)); 