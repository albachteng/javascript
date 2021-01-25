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

/* Modeling communication between client and server
remote procedure calls: request to server includes a function's name and arguments
and response contains the returned value - so just like a normal function call
except that the function runs on another machine */ 
