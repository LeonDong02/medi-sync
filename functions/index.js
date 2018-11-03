const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const passport = require('passport');
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;

const firebaseApp = firebase.initializeApp(functions.config().firebase);
const database = firebase.database();

const ref = database.ref("data");
const usersRef = ref.child("users");
const app = express();

app.use(express.static('views'));
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');
console.log('test');
passport.use(new FitbitStrategy({
  clientID: '22D59S',
  clientSecret: '593fa72b8cacede4644a48c0ff53f8dd',
  callbackURL: 'https://echacks-892cd.firebaseapp.com/auth/callback/'
}, (accessToken, refreshToken, profile, done) => {
  setUser({id: profile.id}, (err, user) => {
    return done(err, user)
  });
}));
app.get('/', (req, res) => {
  res.render('index', {code:"Homepage"});
});
app.get('/auth', passport.authenticate('fitbit'));
app.get('/auth/callback', passport.authenticate('fitbit', {
  failureRedirect: 'auth/failure'
}, (req, res) => {
  res.redirect('/success');
}));

exports.app = functions.https.onRequest(app);

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
