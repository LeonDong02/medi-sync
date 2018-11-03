const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

const firebaseApp = firebase.initializeApp(functions.config().firebase);
const database = firebase.database();

const app = express();

app.use(express.static('views'));
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index', {code:"Homepage"});
});
app.get('/auth', (req, res) => {});
app.get('/auth/callback', (req, res) => {});

exports.app = functions.https.onRequest(app);
<<<<<<< HEAD
=======

function setUser(data, callback) {
  console.log(data, callback);
  usersRef.child(data.id).transaction((currentData) => {
    if (currentData === null) {
      return data;
    }
    return usersRef.child(data.id);
  }, (error, committed, snapshot) => {
    console.log(error, committed, snapshot);
    callback(error, snapshot);
  });
}


function getInfo(userID) {
  let url = `https://api.fitbit.com/1/user/${userID}/activities/heart/date/today/1d.json`;
  request(url, function (err, response, body) {
    let information = JSON.parse(body);
    if (information.activities-heart) {
      res.render('index', {code: information.activities-heart[0].restingHeartRate});
    }
  });
}
>>>>>>> 20501de0e78e41e82ffd3bd4d66fdfff8ae4d6d3
