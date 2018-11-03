const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const FitbitApiClient = require('fitbit-node');

const firebaseApp = firebase.initializeApp(functions.config().firebase);
const database = firebase.database();

const app = express();
const client = new FitbitApiClient({clientId: '22D59S', clientSecret: '593fa72b8cacede4644a48c0ff53f8dd'});
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index', {code:"Homepage"});
});
app.get('/auth', (req, res) => {
  let url = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22D59S&redirect_uri=https%3A%2F%2Fechacks-892cd.firebaseapp.com%2Fcallback&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800';
  res.redirect(url);
});
app.get('/callback', (req, res) => {
  res.render('callback');
});
app.get('/landing', (req, res) => {
  res.send("Content: " + req.body.content);
});

exports.app = functions.https.onRequest(app);
