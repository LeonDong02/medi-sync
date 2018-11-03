const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const request = require('request');

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
  }
});


exports.app = functions.https.onRequest(app);
