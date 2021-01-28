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

console.log(isPrime(23)); // expect true;
console.log(isPrime(27)); // expect false;
console.log(isPrime(factor)); // false (so we know this isn't a fool's errand);
console.log(Math.floor(factor / 2)); // an odd number, 300425737571

for (let i = Math.floor(factor / 2); // start at the halfway point b/c there is no way a number greater than half could be a factor
    i > 2; // increment down until we hit 3, at which point there are no more possible factors
    i = i - 2) { // step down by two (no need to test even numbers as they are not prime)
        if (factor % i === 0) { // i.e. i is a factor of our test case
            console.log(i);
            if (isPrime(i)) {
                console.log(`${i} is the greatest prime factor of ${factor}.`);
                return;
            }
        }
    }

