/* prompt: Write a program that performs an HTTP GET request to a URL provided to you  
  as the first command-line argument. Write the String contents of each  
  "data" event from the response to a new line on the console (stdout).*/ 

const http = require('http'); // necessary for get request
const url = process.argv[2]; // first command-line argument

http.get(url, (response) => { // since it has methods for handling errors, we don't need to 
    // treat it as an error-first callback like the others? 
    // response object is a Node Stream object, treat as object that emits events
    response.setEncoding('utf8'); // set data events to emit Strings rather than Buffer objects
    response.on('data', (chunk) => {
        console.log(chunk); // we could have it add to a string here and only print on 'end' event
        // but the specifications ask for us to log the individual chunks 
    });
    response.on('error', (err) => {
        console.log(err);
    });
})