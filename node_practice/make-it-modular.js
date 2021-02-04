const mymodule = require('./mymodule.js'),
      directory = process.argv[2],
      extension = process.argv[3];

mymodule(directory, extension, (err, list) => {
    if (err) { // we write the callback function within the call to mymodule
        return console.log(`Error: ${err}`);
    } // it console logs an error if one is passed as first argument

    list.forEach((file) => {
        console.log(file);
    }); // and logs each item in the filtered list otherwise
});

// test with node make-it-modular.js './' 'js' to see all js files printed to the console
