let numbers = process.argv; 
let j = 0; 
for (let i = 2; i < numbers.length; i++) {
    j = j + Number(numbers[i]);
} 
console.log(j);
