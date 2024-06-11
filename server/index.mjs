"use strict";

import express from 'express';
import session from 'express-session';
import passport from 'passport'; // authentication
import bodyParser from 'body-parser';
import cors from 'cors';
import { Strategy as LocalStrategy } from 'passport-local'; // For passport (authentication)
import sqlite3 from 'sqlite3';


const app = express(); // creates an application object app
const port = 3001;
//const db = new sqlite3.Database('./database.sqlite');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Set up Passport
/*passport.use(new LocalStrategy(
  (username, password, done) => {
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect credentials.' });
      return done(null, user);
    });
  }
));*/

// Strategies define how to authenticate users
// LocalStrategy supports authentication with username and password
// function verify(...) -> find/verify the user that possesses given credentials
// callback() supplies Passport with the authenticated user
/*
• username, password: automatically
extracted from req.body.username and
req.body.password
• Must check the validity of the credentials
• callback(): communicates the result
        – callback(null, user) à valid
        credentials
        – callback(null, false) à invalid
        credentials, login failed
        – callback(null, false, { message:
        'error'}) à invalid credentials, login
        failed, with explanation
        – callback({error: 'err msg'}) à
        application error (e.g., DB error)
• user: any object containing information
about the currently validated user
*/
passport.use(new LocalStrategy( function verify (username, password, callback) {
    dao.getUser(username, password).then((user) => {
        if(!user)
            return callback(null, false, { message: 'Incorrect username and/or password.' });

        return callback(null, user);
    });
}));

/* Fra chat
passport.serializeUser((user, done) => {
  done(null, user.id);
});*/

/* Fra chat
passport.deserializeUser((id, cb) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    done(err, user);
  });
});*/

passport.serializeUser((user, cb) => { // cb = callback
  cb(null, user); // {id: user.id, email:user.username, name: user.name}
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});

/////////////// Define Express routes ///////////////////
// Login
app.post('/api/login', passport.authenticate('local'), (req, res) => {
  // res.send(req.user); // Chat
  // This function is called if authentication is successful.
  // req.user contains the authenticated user.
  res.json(req.user.username); // Send an object by serializiing it into JSON
});

// Logout
app.post('/api/logout', (req, res) => {
  req.logout(() => { 
    res.end();
  });
  // res.sendStatus(200); // Chat
});



app.get('/api/memes', (req, res) => {
  // Implement API to get random meme and captions
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
