// The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143?

// probably want to start at the halfway point and iterate downward, since the largest possible factor will be half the number
// but this doens't really optimize runtime since O(N/2) ~= O(N)
// we can iterate downward by 2 at a time, since we're definitely not interested in even factors
// can use the modulo operator to determine if a number is a factor
// but then comes the difficulty of determining if the number is prime... 
// brute force method would require you to again use modulo on at least each odd number below it
// optimize by stopping at square root, since any factors below the square root will already have been found by their paired factor
// again, I feel like memoization might be a useful approach here but I'm not sure how to impmlement
// we could try a different approach - simply find all factors and push to an array
// then we only need to determine if those numbers are prime

const factor = 600851475143;

const isPrime = num => { // helper function checks for prime
    for (let i = 2; i < Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

for (
    let i = Math.ceil(factor / 2); // begin testing for factors at halfway point since it is not possible for a factor to have a pair greater than 2
    i > Math.sqrt(factor); // stop testing for factors at the square root, since any factors smaller than the square root would have to be paired with a number greater than the square root and already tested for
    i-= 2) { // step down by two (no need to test even numbers as they are not prime)
        if (factor % i === 0) { // if factor divides evenly by i, i is a factor and needs to be tested for prime
            console.log(`Testing factor ${i} for prime`); // flag is never printed to console, so it is the above logic that is flawed;
            for (let j = 2; j < Math.sqrt(i); i++) {// test for prime by modulo == 0 starting at 2 and up to sqrt(i)
                if (i % j === 0) { // if i can be divided evenly by any number up to its square root, it is not prime
                    break;  // as soon as we find that it is not prime, we can break out of the inner loop
                } else { // if we have gone through all possible tests, the number is prime
                    return i; // we can return i, as it is the greatest prime factor
                }
            }
    }
}

