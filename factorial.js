function factorial(num, product = {'0': 1, '1': 1, 'current': 1}) {
	if (product[num]) return product[num]; 
    else {
    product[num] = factorial(num - 1, product);
    return product['current'] *= num;
  }
}

let start = Date.now();
console.log(factorial(1000));
console.log(factorial(2000));
let end = Date.now();
console.log(end - start); // 10ms, doesn't seem to be any better than the un-memoized version

// const subLength = (string, character) => {
//     let first = -1;
//     let second = -1;
//     let third = -1;
//     for (let i=0; i<=string.length-1; i++) {
//         if (string[i] === character && first === -1 && second === -1) {
//             first = i+1;
//             console.log(first);
//         } else if (string[i] === character && first !== -1 && second === -1) {
//             second = i+1;
//             console.log(second);
//         } else if (string[i] === character && first !== -1 && second !== -1) {
//             third = i+1;
//             console.log(third);
//         }
//         }
//         if (second !== -1 && third === -1) {
//             return second - first + 1;
//         } else return 0;
//         } 


// const groceries = (list) => {
//     let stringList = '';

//     for (let i = 0; i < list.length; i++) {
//         stringList += list[i].item;
//         if (i < list.length - 2) {
//             stringList += ', ';
//         } else if (i === list.length - 2) {
//             stringList += ' and ';
//         }  
//     } 
    
//     return stringList;
// }