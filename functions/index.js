const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const firebaseApp = firebase.initializeApp(functions.config().firebase);

function getData() {
  const ref = firebaseApp.database().ref('data');
  return ref.once('value').then(snap => snap.val());
}
const app = express();
app.use(express.static('views'));
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  getData().then(data => {
    res.render('index', {data});
  });
});
exports.app = functions.https.onRequest(app);
