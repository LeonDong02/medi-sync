const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const request = require('request');
const http = require('http');
const querystring = require('querystring');

const firebaseApp = firebase.initializeApp(functions.config().firebase);

const app = express();

app.use(express.static('views'));
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index', {code:"Homepage"});
});
app.get('/auth', (req, res) => {
  let code = req.query.code;
  if (code) {
    res.render('index', {code});
    request.post({
      headers: {
        'Authorization': 'Basic MjJENTlTOjU5M2ZhNzJiOGNhY2VkZTQ2NDRhNDhjMGZmNTNmOGRk',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: 'https://api.fitbit.com/oauth2/token',
      form: {
        'clientId': '22D59S',
        'grant-type': 'authorization-code',
        'redirect-uri': 'https%3A%2F%2Fechacks-892cd.firebaseapp.com%2Ftoken%2F',
        'code': code
      }
    }, (error, response, body) => {
      console.log(response, body);
    });
  }
});
app.get('/token', (req, res) => {
  res.render('index', {req.query.token});
});

exports.app = functions.https.onRequest(app);
