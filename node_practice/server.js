// CREATING SERVERS

        const http = require("http");
        // server = http.createServer((request, response) => {
        //     response.writeHead(200, {'Content-Type': 'text/plain'});
        //     response.write('Hello world'); 
        //     response.end(); 
        // });

    // more concise method of creating a server
    // simply passes the (request, response) => ... callback to createServer
    // Node adds the request event handler for us
    // you could also write a makeServer function with the (request, response) body
    // and pass it into createServer (this amounts to the same thing)

// ROUTING

    // browser makes a request saying what they are looking for
    // server responds by giving the browser what they asked for
    // in NodeJS, routes need to be defined manually

        const url = require('url'); 

        const makeServer = function(request, response) {
            let path = url.parse(request.url).pathname;
            console.log(path); 

            if (path === '/') {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.write("Hello world");
            }
            else if (path === "/about") {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.write('About page'); 
            }
            else if (path === '/blog') {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.write('Blog page'); 
            }
            else {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write('Error page');
            }
            response.end();
        };
        const server = http.createServer(makeServer);
        server.listen(3000, () => {
            console.log('Node server created at port 3000');
        });

    // 'url.parse()' takes url as argument and breaks it into:
    // protocol (https)
    // host (www.website.com)
    // path (/about, /blog, etc.)
    // querystring (?name=graham, etc)

    