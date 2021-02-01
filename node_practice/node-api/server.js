// RESTful APIs

    // client and server are ignorant of one-another's state
    // different clients hit the same REST endpoints and get the same response
    // for a given action

    // an API endpoint is a single function in an API that returns data

const express = require('express'),
      server = express(),
      users = require('./users'); // need the user data in order to share it

server.set('port', process.env.PORT || 3000); 

server.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
    // searches for a file and sends it to the browser
    //__dirname to get the root folder from which our server is running
    // then concatenate the file we want to serve, in this case /index.html
});

server.get('/users', (request, response) => {
    response.json(users);
    // send our users array as json
});

server.listen(3000, () => {
    console.log('Express server started at port 3000');
});