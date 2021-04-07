function total(arr) {
    return arr.reduce((a, b) => a + b);
 }
 
 console.log(total([1,2,3])); // 6

 function stringConcat(arr) {
    return arr.reduce((str, substr) => str += substr, '');
 }
 
 console.log(stringConcat([1,2,3])); // "123"

 
/* Turn an array of voter objects into a count of how many people voted */ 


function totalVotes(arr) {
    return arr.reduce((tally, voter) => {
        if (voter.voted) tally++;
        return tally;
    }, 0);
 }
 
 var voters = [
     {name:'Bob' , age: 30, voted: true},
     {name:'Jake' , age: 32, voted: true},
     {name:'Kate' , age: 25, voted: false},
     {name:'Sam' , age: 20, voted: false},
     {name:'Phil' , age: 21, voted: true},
     {name:'Ed' , age:55, voted:true},
     {name:'Tami' , age: 54, voted:true},
     {name: 'Mary', age: 31, voted: false},
     {name: 'Becky', age: 43, voted: false},
     {name: 'Joey', age: 41, voted: true},
     {name: 'Jeff', age: 30, voted: true},
     {name: 'Zack', age: 19, voted: false}
 ];
 console.log(totalVotes(voters)); // 7

 function shoppingSpree(arr) {
    return arr.reduce((totalCost, item) => {
        return totalCost += item.price;
    }, 0) 
 }
 
 var wishlist = [
     { title: "Tesla Model S", price: 90000 },
     { title: "4 carat diamond ring", price: 45000 },
     { title: "Fancy hacky Sack", price: 5 },
     { title: "Gold fidgit spinner", price: 2000 },
     { title: "A second Tesla Model S", price: 90000 }
 ];
 
 console.log(shoppingSpree(wishlist)); // 227005

 function flatten(arr) {
    return arr.reduce((flattenedArr, nextItem) => {
        return flattenedArr.concat(nextItem);
    }, []);
 }
 
 var arrays = [
     ["1", "2", "3"],
     [true],
     [4, 5, 6]
 ];
 
 console.log(flatten(arrays)); // ["1", "2", "3", true, 4, 5, 6];

 var voters = [
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
];

function voterResults(arr) {
   return arr.reduce((voteResults, voter) => {
       if (voter.age < 25)
       return voteResults;
   }, {
       numYoungVotes: 0,
       numYoungPeople: 0,
       numMidVotesPeople: 0,
       numMidsPeople: 0,
       numOldVotesPeople: 0,
       numOldsPeople: 0
   });
}

console.log(voterResults(voters)); // Returned value shown below:
/*
{ numYoungVotes: 1,
  numYoungPeople: 4,
  numMidVotesPeople: 3,
  numMidsPeople: 4,
  numOldVotesPeople: 3,
  numOldsPeople: 4 
}
*/