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

        let {readFile, createReadStream} = require("fs");
        readFile("file.txt", "utf8", (error, text) => {
            if (error) throw error;
            console.log("The file contains:", text);
        });

    // note that by default the character encoding is binary and returns a Buffer object
    // it's pretty much always utf8

    // writeFile used to write a file to disk
    // unlink deletes a file

        const {writeFile} = require("fs"); 

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
        // let server = createServer((request, response) => {
        //     response.writeHead(200, {"Content-Type": "text/html"});
        //     response.write(`
        //         <h1>Hello!</h1>
        //         <p>You asked for <code>${request.url}</code></p>`);
        //     response.end();
        // });
        // server.listen(8000); // note that default port is 80
        // console.log("Listening! (port 8000)");

    // after running this code, you can go to localhost:8000/hello and see the response

    /* Function passed as argument to createServer is called every time a client 
    connects. "request" and "response" objects represent incoming and outgoing data.*/

    // ! listening process continues after you run node.js, control-C to close it 

        // const {request} = require("http");
        // let requestStream = request({
        //     hostname: "eloquentjavascript.net",
        //     path: "/20_node.html", 
        //     method: "GET", 
        //     headers: {Accept: "text/html"}
        // }, response => {
        //     console.log("Server responded with status code", response.statusCode);
        // });
        // requestStream.end();

    /* first argument to 'request' configures the request, second is the function 
    to call when a response comes back. It is given a 'response' object to inspect.*/ 

    /* all that being said, 'node-fetch' or similar NPM packages are more convenient than 
    using the raw http functionality in Node. 'Node-fetch' has the advantage of being promise-based
    just like what we use in the browser.*/

// STREAMS

    /* 'Request' object and 'response' object are *writable streams*: they have a "write" method
    that can be passed a string or "Buffer" object. Their "end" method closes the stream and 
    optionally takes a value to write to the stream before closing. Both "write" and "end"
    can also be given an additional callback argument, which calls when the writing or 
    closing has finished.*/

    /* Readable streams use event handlers (rather than methods). Objects that emit events
    in Node have an "on" method similar to addEventListener method in the browser. It is passed
    an event name and a function. It will call that function whenever the given event occurs.*/
    
    /* *Readable streams* have "data" and "end" events (not the same as the writable stream 'end' method). 
    "data" event is fired whenever data comes in, "end" event is called whenever the stream is at its end. 
    "fs" module has a function 'createReadStream' that can allow a file to be read as a readable stream.*/
    
    // This code creates a server that reads request bodies and streams themback to the client in uppercase text
        // createServer((request, response) => {
        //     response.writeHead(200, {"Content-Type": "text/plain"});
        //     request.on("data", chunk => response.write(chunk.toString().toUpperCase()));
        //     request.on("end", () => response.end());
        // }).listen(8000);

        // request({
        //     hostname: "localhost",
        //     port: 8000,
        //     method: "POST",
        // }, response => {
        //     response.on("data", chunk => 
        //         process.stdout.write(chunk.toString()));
        // }).end("hello server"); // expect "HELLO SERVER"

    // note that this example writes to process.stdout instead of console.log
    // console.log adds newlines after each piece of text it writes, which would be messy

// A FILE SERVER

        const methods = Object.create(null); 

        createServer((request, response) => {
            let handler = methods[request.method] || notAllowed;
            handler(request)
                .catch(error => {
                    if (error.status != null) return error;
                    return {body: String(error), status: 500}; 
                }) // translates error into a response object
                // note that status defaults to 200 if omitted
                .then(({body, status = 200, type = "text/plain"}) => {
                    response.writeHead(status, {"Content-Type": type});
                    if (body && body.pipe) body.pipe(response);
                    // pipe method forwards all content from readable stream to writable stream
                    else response.end(body); 
                }); // if body is null, a string or a buffer, it is passed directly to the response.end method
        }).listen(8000);

        async function notAllowed(request) {
            return {
                status: 405, 
                body: `Method ${request.method} not allowed.`
            };
        }

    // starts a server that only returns a 405 error response: method not allowed.

    // Use urlPath function from Node's url module to parse the URL

        const {parse} = require("url"); 
        const {resolve, sep} = require("path"); 

    // sep binding resolves system's path separator - backslash on Windows, forward slash on most others

        const baseDirectory = process.cwd(); // sets "baseDirectory" to current working directory

        function urlPath(url) {
            let {pathname} = parse(url); 
            let path = resolve(decodeURIComponent(pathname).slice(1)); // resolves relative paths
            if (path != baseDirectory && // verify this path is *below* the cwd
                    !path.startsWith(baseDirectory + sep)) {
                throw {status: 403, body: "Forbidden"};
            } // throws an error if the directory is forbidden
            return path; // returns the parsed url (unless it is of the incorrect directory)
        }

    // run npm mime@2.2.0 to install the MIME package for determining correct type for files

        const {stat, readdir} = require("fs").promises; // async bc must touch the disk and may be slow
    // stat function looks up information about a file, including whether it exists / is a directory
        const mime = require("mime");

        methods.GET = async function(request) {
            let path = urlPath(request.url);
            let stats;
            try {
                stats = await stat(path);
            } catch (error) {
                if (error.code != "ENOENT") throw error; // error.code "ENOENT" = does not exist
                else return {status: 404, body: "File not found"}; 
            }
            if (stats.isDirectory()) {
                return {body: (await readdir(path)).join("\n")};
                // if it is a directory, we return the list of files
            } else {
                return {body: createReadStream(path),
                        type: mime.getType(path)};
            }
        };

        const {rmdir, unlink} = require("fs").promises;

        methods.DELETE = async function(request) {
            let path = urlPath(request.url);
            let stats;
            try {
                stats = await stat(path); 
            } catch (error) {
                if (error.code != "ENOENT") throw error;
                else return {status: 204}; // "no content" therefore nothing to delete
            } // "idempotent" - same request multiple times produces the same result
            // this is why attempting to delete a nonexistent file returns a "success" status
            if (stats.isDirectory()) await rmdir(path);
            else await unlink(path);
            return {status: 204};
        };

        const {createWriteStream} = require("fs"); 

        function pipeStream(from, to) {
            return new Promise((resolve, reject) => {
                from.on("error", reject); 
                to.on("error", reject);
                to.on("finish", resolve); 
                from.pipe(to); 
            });
        }

        methods.PUT = async function(request) {
            let path = urlPath(request.url);
            await pipeStream(request, createWriteStream(path));
            return {status: 204};
        };

    /* no need to check for existence since we would just overwrite it with a PUT request. 
    We use pipe to move data from a readable stream to a writable one (from the request to 
    the file). We wrap a function around pipe to generate a Promise. Wire up promise rejections
    for possible errors in case network goes down during write or retrieve steps.  */ 

    /* you can test the server after running this script with the curl command 
    i.e. curl http://localhost:8000/file.txt => "I am a file and you can put documents in me"
    curl -X PUT -d hello http://localhost:8000/hello.txt => create hello.txt w/ "hello"
    -X option is used to set the request's method, -d is used to include a request body. 
    try it with DELETE method as well, etc. */ 