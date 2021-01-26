// Chapter 20 Eloquent JavaScript - notes and exercises
// most of this code is not my own original work - see eloquentjavascript.net

// NODE - differences to browser-based JS

    /* consider the differences in console.log in Node versus in the browser" 
    In a browser environment, console.log prints a string to the browser's JS console.
    In node, the text will instead go to the process's standard output stream - it logs
    the string to the terminal. In a similar vein, if you run node without giving it a file, 
    you will be prompted to begin typing JS code and immediately see the returned results.
    */

// PROCESS 

    /* try typing node in the terminal and hit return without specifying a file. 
    Then type simple commands line by line: 

        1+1 
        // 2
        [-1, -2, -3].map(Math.abs)
        //[1, 2, 3]
        process.exit(0)
        // $ (ends the node command)
        */ 

    /* process binding is a global variable in Node. Its purpose is to provide ways to inspect and 
    manipulate the current program. The exit method ends the process. It can be passed an exit status
    code (zero is 'success') which tells the program that started node whether it encountered errors.
    ! NTS it would seem you can shorten this to .exit for the same effect? implies that process takes
    takes the place of the global namespace? */ 

    /* process.argv property is an array of strings that contains the command line arguments given 
    to your script. Its first two entries are the name of the node command and the script name, so the 
    actual arguments start at index 2. */ 

        console.log(process.argv); // run in the command line with a few arguments to seee them listed
        // as in: node node.js one --and two => ["node", "node.js", "one", "--and", "two"]

    // all the standard global bindings are present in node except browser-related 'document' or 'prompt'.

// MODULES

    /* node usese the CommonJS module system based on the require function. As before, require takes
    a string as argument, which is either evaluated relatively ('./<file>.js or ../javascript_practice/<file>)
    or absolutely. The .js extension may be omitted, Node will assume it. If you point to a directory, 
    Node will try to load the file named index.js in that directory. If the string is neither a relative
    nor an absolute path, Node will assume you are referring to either a built-in module or a module 
    installed in a node_modules directory. */ 

    // try: 

        const reverse = function(string) {
            return Array.from(string).reverse().join("");
        }

        let argument = process.argv[2]; 

        console.log(reverse(argument)); // can be called with node node.js <some string>

    // try: 

        // npm install ini
        // node
        // > const {parse} = require("ini");
        // > parse("x = 1\ny=2"); 
        // => { x: '1', y: '2' }

    // worth checking out 'ini' in node_modules directory, note "parse" property

    // NPM installs packages under the current directory, rather than in a central place.
    // this gives the user control over each application's packages and version management.

// PACKAGE FILES

    /* package.json is recommended for each project 
    run npm init to generate or create it manually
    contains info such as author, name, version, depdendencies */

    /* running npm install without explicitly naming a package will install the 
    dependencies listed in package.json. NPM will also add installed packages to 
    package.json */ 

// VERSIONS

    // package.json files list its versions and dependencies' versions. 

    /* semantic versioning encodes compatability with three period-separated numbers
    such as 2.3.0 - middle number is incremented to indicate new functionality, while 
    compatability breaks increment the first number. A caret ^ indicates that the 
    specified version or higher up to the next compatibility number is required. So
    ^2.3.0 indicates that version up to 3.0.0 would be allowed. */ 

    // "npm publish" can publish a package with name and version listed in the json file. 

// FILE SYSTEM MODULE

    /* The "fs" module exports functions for working with files and directories. 
    The readFile function reads a file and then calls a callback with its contents. */ 

        let {readFile} = require("fs");
        readFile("file.txt", "utf8", (error, text) => {
            if (error) throw error;
            console.log("The file contains:", text);
        });

    // note that by default the character encoding is binary and returns a Buffer object
    // it's pretty much always utf8

    // writeFile used to write a file to disk
    // unlink deletes a file

        const {writeFile, unlink} = require("fs"); 

        writeFile("graffiti.txt", "Node was here", err => {
            if (err) console.log(`Failed to write file: ${err}`);
            else console.log(`File written.`);

            // cleaning up after myself
            unlink("./graffiti.txt", err => {
                if (err) console.log(`${err}`);
                else console.log('File deleted.');
            });
        });

    // writeFile will assume UTF-8 if passed a string
    
    /* Most of the functions in the fs module take a callback as last parameter.
    These callbacks are called either with an error (first argument) or with a 
    successful result (the second). */ 

    // ! import promise-based functions by appending .promises to the require

        // const {readFile} = require('fs').promises;
        // readFile("file.txt", "utf8")
        //     .then(text => console.log("The file contains:", text));

    // Also has synchronous (blocking) versions with Sync appended to function name

// HTTP MODULE

    // creating a basic HTTP server: 

        const {createServer} = require("http");
        let server = createServer((request, response) => {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(`
                <h1>Hello!</h1>
                <p>You asked for <code>${request.url}</code></p>`);
            response.end();
        });
        server.listen(8000); // note that default port is 80
        console.log("Listening! (port 8000)");

    // after running this code, you can go to localhost:8000/hello and see the response

    /* Function passed as argument to createServer is called every time a client 
    connects. "request" and "response" objects represent incoming and outgoing data.*/

    // ! listening process continues after you run node.js, control-C to close it 

        const {request} = require("http");
        let requestStream = request({
            hostname: "eloquentjavascript.net",
            path: "/20_node.html", 
            method: "GET", 
            headers: {Accept: "text/html"}
        }, response => {
            console.log("Server responded with status code", response.statusCode);
        });
        requestStream.end();

    /* first argument to request configures the request, second is the function 
    to call when a response comes back. It is given a response object to inspect.*/ 

    /* all that being said, 'node-fetch' or similar NPM packages are more convenient than 
    using the raw http functionality in Node. 'Node-fetch' has the advantage of being promise-based
    just like what we use in the browser.*/

// STREAMS

    /* Request object and response object are writable streams: they have a "write" method
    that can be passed a string or Buffer object. Their "end" method closes the stream and 
    optionally takes a value to write to the stream before closing. Both "write" and "end"
    can also be given an additional callback argument, which calls when the writing or 
    closing has finished.*/ 

    /* Reading from streams use event handlers rather than methods. Objects that emit events
    in Node have an "on" method similar to addEventListener method in the browser. It is passed
    an event name and a function. It will call that function whenever the given event occurs.*/
    
    /* Readable streams have "data" and "end" events. First fired whenever data comes in, second
    is called whenever the stream is at its end. "fs" module has a function createReadStream that
    can allow a file to be read as a readable stream.*/
    
        const {createServer} = require("http");
        createServer((request, response) => {
            response.writeHead(200, {"Content-Type": "text/plain"});
            request.on("data", chunk => response.write(chunk.toString().toUpperCase()));
            request.on("end", () => response.end());
        }).listen(8000);