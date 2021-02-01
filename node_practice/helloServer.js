const http = require('http'); 

let requestListener = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'}); 
    response.write('Hello World!\n');
    response.end(); 
};

const server = http.createServer(requestListener); 

server.listen(3000);