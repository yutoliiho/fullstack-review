const express = require('express');
const mongoose = require('mongoose');
const PORT = 1128;
// const db = require('../config')
// const db = require('../database/index');
const getReposByUsername = require('../helpers/github');
// const model = require('../database/model')

const Repo = require('../database/index')
// const saveDataToDB = require('../database/index.js').saveDataToDB
// const getDataFomDB = require('../database/index.js').getDataToDB
// const getAllDataFromDB = require('../database/index.js').getAllDataFromDB




var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are connected!')
});

var app = express();

// translate things to JSON;
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = 'yutoliiho'
  // req.body.username
  // 'BenMusch'
  getReposByUsername(username, (err, result) => {
    if (err) {
      console.log(`401 getReposByUsername at app.post`)
      console.log(err)
      res.status(401).send(err)
    } else {
      Repo.saveDataToDB(result, (err, response) => {
        if (err) {
          console.log(`404 saveDataToDB at app.post`)
          res.status(404).send(err);
        } else {
          res.status(201).send(result.slice(0, 2));
        }
      });
    }
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // var username = req.body.username;
  Repo.getDataFomDB('BenMusch', (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(response.slice(0, 2));
      // Client getting [{..}, {...}]
    }
  })
});

// check to see if I have all data saved;
app.get('/repos/all', function (req, res) {
  Repo.getAllDataFromDB((err, result) => {
    if (err) { res.status(400).send(err); }
    else { res.status(200).send(result); }
  })
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

