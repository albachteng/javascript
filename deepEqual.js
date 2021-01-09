// Your code here.
const deepEqual = (first, second) => {
    if (first === second) {
      return true;
    }
    if (typeof first == 'object' 
        && first != null 
        && typeof second == 'object' 
        && second != null) {
      // compare keys
      let keys1 = Object.keys(first);
      let keys2 = Object.keys(second);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (!deepEqual(first[key], second[key])) {
          console.log(keys1, keys2);
          console.log(first[key], second[key]);
          return false;
        }
      }
      return true;
    }
  }
  
  
  let obj = {here: {is: "an"}, object: 2};
  console.log(deepEqual(obj, obj));
  // → true
  console.log(deepEqual(obj, {here: 1, object: 2}));
  // → false
  console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
  // → true