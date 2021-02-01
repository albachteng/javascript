const fs = require('fs'); 

let path = process.argv[2]; 

const contents = fs.readFile(path, 'utf8', (err, data) => {
    console.log(data.split('\n').length - 1);
});