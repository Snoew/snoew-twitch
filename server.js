const logger = require('pino')();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 42069;
const fetch = require('node-fetch');
const config = require('./config');

const logins = [
  'Makaira',
  'snoewwolf',
  'Jhonsk',
  'Onscreen', // BoothTl
  'RandomWelshman',
];
global.Headers = fetch.Headers;

// Make sure to add clientId field to config.js and do not include in vcs
const { clientId } = config;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/hello', (req, res) => res.send('Hello World!'));

function sendResponse(res, result) {
  res.send(result);
}

function getUsers(res) {
  const myHeaders = new Headers();
  myHeaders.append('Client-ID', clientId);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(`https://api.twitch.tv/helix/users?login=${logins[0]}&login=${logins[1]}&login=${logins[2]}&login=${logins[3]}&login=${logins[4]}`, requestOptions)
    .then((response) => response.text())
    .then((result) => sendResponse(res, result))
    .catch((error) => logger.error('error', error));
}


app.get('/users', (req, res) => {
  logger.info('Request for users');
  res.setHeader('Content-Type', 'application/json');
  getUsers(res);
});

function getStreams(res) {
  const myHeaders = new Headers();
  myHeaders.append('Client-ID', clientId);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(`https://api.twitch.tv/helix/streams?user_login=${logins[0]}&user_login=${logins[1]}&user_login=${logins[2]}&user_login=${logins[3]}&user_login=${logins[4]}`, requestOptions)
    .then((response) => response.text())
    .then((result) => sendResponse(res, result))
    .catch((error) => logger.error('error', error));
}

app.get('/streams', (req, res) => {
  logger.info('Request for streams');
  res.setHeader('Content-Type', 'application/json');
  getStreams(res);
});

app.listen(port, () => logger.info(`Snoew-Twitch listening at http://localhost:${port}`));
