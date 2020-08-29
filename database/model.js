const Repo = require('./index')
const mongoose = require('mongoose');

module.exports = {
  saveRepos: function (repos, callback) {
    console.log(repos)
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB
    // console.log('saved: ', repos[0].id)
    // Repo.doSomethingWithReposData
    Repo.save(repos, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    })
    // repos.forEach(repo => {
    //   Repo.save(repo)
    //     .then((response) => {
    //       obj = {
    //         username: response.name,
    //         description: String,
    //         html_url: String,
    //         updated_at: Date
    //       }
    //       callback(response)
    //     })
    //     .catch((err) => {
    //       callback(err);
    //     })
    // })
  },
  getRepos: function () {
    //
    // console.log('saved: ', repos[0].id)
  }
}