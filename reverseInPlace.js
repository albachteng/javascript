// reversing an array iteratively, generating a new array
const reverseArray = (arr) => {
  let reverse = [];
  for (let element of arr) {
    reverse.unshift(element);
  }
  return reverse;
}

// reverse an array without creating a new array by swapping items
const reverseArrayInPlace = (arr) => {
	for (let i = 0; i < Math.floor(arr.length/2); i++) {
      let hold = arr[i];
      arr[i] = arr[arr.length - 1 - i];
      arr[arr.length - 1 - i] = hold;
    }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]