// generates a random snark from a villain during the climactic battle

const randomNumber = function(num) {
    return Math.floor(Math.random() * num);
}

const snark = {
    meanName: ['Feeble interloper!', 'Foolish human!', 'Puny mortal!', 'Pathetic filth!'],
    insult: ['You cannot defeat me!', 'You will never escape this place!', 'Make peace with your god - today you die!', 'Despair! This is your end.', 'I am your doom!'],
    praiseSelf: ['For I am Acererak the Undying, Greatest of Liches!', 'I will wipe you from existence with one finger!', 'I shall enslave the gods themselves!', 'Against I, who have conquered death - did you really think you would stand a chance?'],
}

const addSnark = function (string, category) {
    if (Object.keys(snark).includes(category)) {
        snark[category].push(string);
    } else throw new Error('Foolish mortal! This is not proper snark!')
}

const composeSnark = () => {
    let randomMeanName = snark.meanName[randomNumber(snark.meanName.length)];
    let randomInsult = snark.insult[randomNumber(snark.insult.length)];
    let randomPraiseSelf = snark.praiseSelf[randomNumber(snark.praiseSelf.length)];
    return `AHAHAHAHA! ${randomMeanName} ${randomInsult} ${randomPraiseSelf} MWAAAHAHAHAHA!`;
}

addSnark('Buttheads!', 'meanName');
console.log(composeSnark());

