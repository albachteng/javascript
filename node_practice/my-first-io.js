const fs = require('fs'); 

let path = process.argv[2];

const contents = fs.readFileSync(path).toString();

const lines = contents.split('\n');
console.log(lines.length - 1);