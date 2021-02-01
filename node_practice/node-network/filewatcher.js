// networking with node.js sockets

// TCP (transmission control protocol) - must be 2 endpoints; 
// one binds to a numbered port while the other connects to the port

const net = require('net'),
      fs = require('fs'),
      filename = process.argv[2], // watch whatever file we pass into the command line

server = net.createServer((connection) => { // only one parameter, the connection object
    console.log('Subscriber connected');
    connection.write(`watching ${filename} for changes`);
    // creates a server to send messages to many clients net.createServer()
    // tell the server that a client connected with connection.write(...) and console.log
let watcher = fs.watch(filename, (err, data) => {
    connection.write(`${filename} has changed`);
}); // watches the file and notifies the client when the watched file has changed

connection.on('close', () => {
    console.log('Subscriber disconnected');
    watcher.close(); // close upon the "close" event
});
});

server.listen(3000, () => console.log('listening for subscribers'));