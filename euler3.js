// The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143?

// probably want to start at the halfway point and iterate downward, since the largest possible factor will be half the number
// can use the modulo operator to determine if a number is a factor
// but then comes the difficulty of determining if the number is prime... 
// for this we can generate an array of prime numbers using the sieve approach

const factor = 600851475143;
let primes = []; 

for (let i = 0; i < factor / 2; i++) {
    primes.push(i); // fill our primes array with all integers up to the halfway point
} 

console.log(primes[5]); // failed, out of memory, not a good solution, over 300 billion items