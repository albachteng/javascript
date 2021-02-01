// EXPRESS

    // Express is a NodeJS framework for building web apps and APIs
    // npm install express --save

        const express = require('express'); 
        const server = express(); // call express

        server.set('port', process.env.PORT || 3000); // set port
    // note that it tries to get the environment port the app is running on 
    // and defaults to 3000 if not available

// routing

        server.get('/', (request, response) => {
            response.send('Home page');
        });

        server.get('/about', (request, response) => {
            response.send('About page');
        });

    // error handling middleware

        server.use((request, response) => {
            response.type('text/plain');
            response.status(505); 
            response.send('Error page');
        });

        server.listen(3000, () => {
            console.log('Express server started at port 3000');
        });

    // you can think of the express routing as a pattern: 
    //! server.VERB('rout', callback);
    // where VERB is GET, POST, etc.
    // route is string that gets appended to domain
    // callback is the function we want to fire when that request comes in

    // server.use() method is middleware - in this case error-handling one

