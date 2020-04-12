const config = require('./config');
const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');
global.Headers = fetch.Headers;

const clientId = config.clientId;

app.get('/hello', (req, res) => res.send('Hello World!'));

app.get('/users', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    getUsers(res);
});

app.get('/streams', function (req, res) {
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
    .then(result => res.send(result))
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
    .then(result => res.send(result))
    .catch(error => console.log('error', error));
}