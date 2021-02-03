let itsAsEasyAs = 'abc';
//@ts-ignore
itsAsEasyAs = 123;

const myModule = require('./my-module');
const { readFile } = require('fs').promises;
const express = require('express');

const app = express();

app.get('/', async (request, response) => {
    response.send(await readFile('./index.html', 'utf8'))
    });

app.listen(process.env.PORT || 3000, () => console.log('app is available on http://localhost:3000'));