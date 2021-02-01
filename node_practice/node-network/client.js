const net = require('net'); 

let client = net.connect({port: 3000});
// connect to port 3000 using net.connect()
client.on('data', (data) => {
    console.log(data.toString());
}); // listen for 'data' events and log them to the console (as a string); 
// otherwise would be a Buffer object? 



