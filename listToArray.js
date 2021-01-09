// 'list' in this context refers to a data structure similar to a linked list;
// each list is an object with a value parameter and a rest parameter;
// the rest parameter is either a list itself or else null (the tail)

// there might be a more efficient way to do this than with recursion? 
// time complexity is O(n) 
const arrayToList = (arr) => { 
    if (arr.length <= 0) {
        return null;
    }
    const list = {};
    list.value = arr.shift();
    list.rest = arrayToList(arr);
    return list;
   }
  
  const listToArray = (list) => {
    arr = [];
    for (let node = list; node; node = node.rest) {
      arr.push(node.value);
    }
    return arr;
  }
  
  const prepend = (element, list) => {
    let newList = {};
    newList.value = element;
    newList.rest = list;
    return newList;
  }
  
  const nth = (list, number) => {
    if (number === 0) {
      return list.value;
    } else {
      return nth(list.rest, number - 1);
    }
  }
  
  console.log(arrayToList([10, 20, 30]));
  // → {value: 10, rest: {value: 20, rest: null}}
  console.log(listToArray(arrayToList([10, 20, 30])));
  // → [10, 20, 30]
  console.log(prepend(10, prepend(20, null)));
  // → {value: 10, rest: {value: 20, rest: null}}
  console.log(nth(arrayToList([10, 20, 30]), 1));
  // → 20