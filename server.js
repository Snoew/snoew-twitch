const config = require('./config');
const express = require('express');
var cors = require('cors')
var app = express()
app.use(cors())
const port = 42069;
const fetch = require('node-fetch');
const logger = require('pino')()

global.Headers = fetch.Headers;

// Make sure to add clientId field to config.js and do not include in vcs
const clientId = config.clientId;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/hello', (req, res) => res.send('Hello World!'));

app.get('/users', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    getUsers(res);
});

app.get('/streams', function (req, res, next) {
    logger.debug("request on streams")
    res.setHeader('Content-Type', 'application/json');
    getStreams(res);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


function getUsers(res) {        
    var myHeaders = new Headers();
    myHeaders.append("Client-ID", clientId);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api.twitch.tv/helix/users?login=Makaira&login=snoewwolf&login=BoothTl&login=Jhonsk&login=RandomWelshman", requestOptions)
    .then(response => response.text())
    .then(result => sendResponse(res, result))
    .catch(error => console.log('error', error));
}

function getStreams(res) {        
    var myHeaders = new Headers();
    myHeaders.append("Client-ID", clientId);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api.twitch.tv/helix/streams?user_login=Makaira&user_login=snoewwolf&user_login=BoothTl&user_login=Jhonsk&user_login=RandomWelshman", requestOptions)
    .then(response => response.text())
    .then(result => sendResponse(res, result))
    .catch(error => console.log('error', error));
}

function sendResponse(res, result) {
    console.log('test');
    logger.info(result.json);
    res.send(result);
}