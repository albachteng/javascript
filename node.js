// Chapter 19 Eloquent JavaScript - notes and exercises
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

    