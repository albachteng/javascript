const mymodule = require('./mymodule.js'),
      directory = process.argv[2],
      extension = process.argv[3];

mymodule(directory, extension, (err, list) => {
    if (err) {
        return console.log(`Error: ${err}`);
    }

    list.forEach((file) => {
        console.log(file);
    });
});