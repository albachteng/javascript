// let originalString = 'abcd';
// console.log(originalString[2] === 'c'); // expect true
// originalString[2] = '2'; // what happens here? 
// console.log(originalString); // expect 'abcd'
// originalString += 'efg';

// function change(passedNum) {
//     return passedNum += 1;
// }

// let originalNum = 1;
// console.log(change(originalNum));
// console.log(originalNum); // expect 1

function change(passedObj) {
    passedObj.myNum += 1;
}

const originalObj = {myNum: 1};
change(originalObj);
console.log(originalObj);