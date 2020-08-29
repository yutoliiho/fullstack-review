// const request = require('request');
const axios = require('axios');
const config = require('../config.js');

var getReposByUsername = (user, callback) => {
  // console.log('setting options');
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      Authorization: `token ${config.TOKEN}`
    }
  };
  axios(options)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error);
    })
};

module.exports = getReposByUsername;