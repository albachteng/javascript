/* EloquentJavaScript.net Chapter 18 notes and code / exercises
most code in this doc is not mine or is based on exercises defined in this book */ 

/* type an address from this domain into address bar
browser first looks up address of server associated with EJS.net
tries to open a TCP connection to it on port 80 (default port for HTTP traffic)
if server exists and accepts the conection, browser sends "GET request" as below: */ 

/* GET /18_http.html HTTP/1.1
Host: eloquentjavascript.net
User-Agent: <your browser's name> */ 

// server responds: 

/* HTTP/1.1 200 OK
Content-Length: 65585
Content-Type: text/html
Last modified: <some date> */

/* <!doctype html>
... rest of the document */ 

/* browser displays the part after the blank line (the "body", not the same as html <body>)
displays it as html document */ 

// method of the request: GET (above), DELETE, PUT, POST... there are others but less common


/* a resource does not have to be a file, it can be anything that can be transferred as if it is a file
some servers generate responses they produce on the fly, i.e. a github profile page */ 

/* HTTP/1.1 indicates version of HTTP protocol it is using
many sites use version 2, but this chapter focuses on 1.1 b/c it is more straightforward
version 2 is faster; browsers switch to the appropriate protocol automatically */ 

/*'200 OK' = status codes (starts with a 2 indicates success, starting with 4 indicates failure)
"OK" just a human-readable string to make status explicit
status code starting with 5 indicates the error was on the server-side and request was fine
everything else above is part of the headers - name: value pairs
can be any number of headers, but a few are required - host, for example */

// GET /example/message.html?name=Jean&message=Yes%3F HTTP/1.1

/* "?" indicates the end of the path part of the URL and the start of the query
query is made up of name/value pairs corresponding to the attirbutes on, say, a form element
& ampersand is used to separate the pairs */ 

/* escaped characters in URL encoding is done with %
so %3F is actually a question mark */ 

console.log(encodeURIComponent("Yes?")); // Yes%3F
console.log(decodeURIComponent("Yes%3F")); // Yes?

/* GET requests used for responses that do not have side effects but simply ask for information
POST requests change something on the server, i.e. creating new account or posting a message */ 

// fetch requests - using promises

fetch("example/data.txt").then(response => {
    console.log(response.status); // 200
    console.log(response.headers.get("Content-Type")); // text/plain
}); 
// this will return an error b/c fetch is a window method, which does not exist in node.js

/* fetch returns a promise that resolves to a Response object
Response holds information about the servers response, including status code and headers
headers are in a Map-like object that treats keys as case-insensitive
so "content-type" will return the same as "Content-Type" above */

fetch("example/data.txt").then(response => response.text())
                         .then(text => console.log(text));
                         // expect text content of data.txt

/* note that fetch uses GET method to make its request by default
to configure a different request, pass in an object as a second argument */ 

fetch("example/data.txt", {method: "DELETE"}).then(response => {
    console.log(response.status); // 405 method not allowed
});

// adding a request body can be done similarly
fetch("example/data.txt", {headers: {Range: "bytes=8-19"}})
    .then(response => response.text())
    .then(console.log); // content

/* the browser will automatically add some request headers to a fetch request
"Host" and those needed for the server to figure out the size of the body */ 

// Include this header to allow cross-domain requests: {Access-Control-Allow-Origin: *}

// Modeling communication between client and server: 

    /* remote procedure calls model: request to server includes a function's name and arguments
    and response contains the returned value - so just like a normal function call
    except that the function runs on another machine */ 

    /* resources and http methods: instead of a remote procedure, define a JSON document format
    to represent the resource you want to create, modify or retrieve. This approach allows us
    to use more of the features HTTP provides, such as support for caching. */ 

// Security & HTTPS

/* before exchanging data, client has to prove to the server that it is who it claims to be
it does so by providing a cryptographic certificate issued by some authority that the browser recognizes.
All data going over the connection is encrypted. */

// Forms

/* any number of input fields grouped in a <form> tag. 
Commonly used <input> types (note that type is an attribute): 
    text (single line text field)
    <textarea> (multiline text field)  //! which gets its own tag rather than attribute
    password (the same, but hides the text that is typed)
    checkbox (on/off switch)
    radio (a piece of a multiple-choice field)
    file (allows for the uploading of files) 
    <select> (dropdown, predefined options) //! and also gets its own tag */ 

/* note that all of these can be used outside of a form tag, but cannot be submitted normally,
 which is fine - a lot of js interaction uses these fields and doesn't need to be submitted */

// whenever the value of a form field changes, it will fire a "change" event

// form fields can also receive //! Keyboard Focus

/* keyboard focus can alter the way that keyboard actions work, i.e. to type into a text field
focus can be controlled with the focus() and blur() methods 
the document.activeElement property corresponds to the currently focused element
JS can be used to change focus but HTML also provides the autofocus attribute 
tabindex HTML attribute can alter the order of tabbed focus changes in the browser */

document.querySelector("input").focus(); // moves focus
console.log(document.activeElement.tagName) // expect "INPUT"
document.querySelector("input").blur(); // removes focus
console.log(document.activeElement.tagName); // expect "BODY"

/* <input type="text" tabindex=1> <a href=".">(help)</a> </input>
<button onclick="console.log('ok')" tabindex=2>OK</button> */

    // tabindex of -1 makes an element skipped over when tabbing

    // even non-form-field tags can receive focus by giving them a tabindex attribute

// Disabled Fields

/* add a disabled attribute - it doesn't even need a value
good idea to use this while some action might prevent the normal use of the control field, 
i.e. while waiting for a response from a server */ 

// form as a whole - name attribute, form property and elements property

/* form fields within a <form> element will have a form property linking back to the form's DOM element 
The <form> element itself has an elements property that contains an array-like / map-like collection of the fields
name attribute determines the way a form field's value will be identified when submitted. 
It can also be used as property name when accessing the form's elements property. */ 

    {<body>
        <form action="example/submit.html">
            Name: <input type="text" name="name"></input><br></br>
            Password <input type="password" name="password"></input><br></br>
            <button type="submit">Log in</button>
        </form>
        <script>
            let form = document.querySelector("form");
            console.log(form.elements[1].type); // ! password, accessed as a list
            console.log(form.elements.password.type); // ! password, accessed by name
            console.log(form.elements.name.form == form); // ! true
        </script>
    </body>}

// note that button of type="submit" will submit the page, as will pressing enter

// text fields

/* "value" property on textarea, input or fields with type text or password share interface
selectionStart and selectionEnd properties of text fields tell us cursor and selection location
"change" event for a field fires after the field loses focus after its content was changed
"input" event fires every time the user types a character, deletes text or manipulates its content */ 

// checkboxes and radio buttons

/* "checked" property holds boolean value
<label> tag associates a piece of the doc with an input field
clicking on the label (by default) activates the field, toggling checkboxes and radio buttons
this also focuses the label's field */ 

/* <select> fields appear as a list of checkboxes when given the "multiple" attribute
such select fields may contain <options> tag that can be accessed like a list through the 
"options" property */ 

    <select multiple>
        <option value="1">Option 1</option>
        ...etc
    </select>

