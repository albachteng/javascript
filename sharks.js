let sharks = [
    'Hammerhead',
    'Great White', 
    'Tiger'
];

sharks.push('Sword');

console.log(sharks);

let seaCreatures = [
    "octopus",
    "squid",
    "shark",
    "seahorse",
    "starfish",
];

// @ts-ignore
seaCreatures.unshift(sharks); // add shark list to start

let fewerSeaCreatures = seaCreatures.slice(0, 1); // remove the sharks list


for (let i = 0; i < seaCreatures.length; i++) { // for loop using iterator
    console.log(i, seaCreatures[i]); // note the added benefit of being able to print index number
}

for (let seaCreature of seaCreatures) { // for... of loop
    console.log(seaCreature);
}

seaCreatures.forEach(creature => { // forEach loop, specific to arrays and more concise
    console.log(creature);
})

// map creates new array with a given function having been called on each item
let manySeaCreatures = seaCreatures.map(seaCreature => {
    return `${seaCreature}s`;
})

console.log(manySeaCreatures);

let numbers = [1, 2, 3, 4, 5, 10, 11, 85];

let sum = numbers.reduce((a,b) => {
    return a + b;
})

console.log(sum);