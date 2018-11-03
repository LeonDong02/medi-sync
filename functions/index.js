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
  
});


exports.app = functions.https.onRequest(app);
