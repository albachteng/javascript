const express = require('express'); 
const app = express(); 

const PORT = process.env.PORT || 4001;

app.use(express.static('express')); // static files in 'public' folder

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

    // Routes define the control flow for request based on *PATH* and *VERB* 
    // where VERB is CRUD (create, read, update, delete)
    // and PATH is the part of the request URL after hostname and port number
    // in express, app.get() = method to register routes to match GET requests

// const moods = [{ mood: 'excited'}, { mood: 'blahblah'}]; 
// app.get('/moods', (req, res, next) => {
    // response block
// }); 
// req, res (request and response objects), next???

