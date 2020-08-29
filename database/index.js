const mongoose = require('mongoose');

// connect DB:
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('DB connected');
}).catch((err) => console.log(err));

// define Schema/collection/table:
let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  owner_login: String,
  forks: Number,
  description: String,
  html_url: String,
  updated_at: Date
});

// define Model:
var Repo = mongoose.model('Repo', repoSchema);

// Model methods SAVE:
var saveDataToDB = (repos, callback) => {
  var successRepos = 0
  repos.forEach(repo => {
    // totalRepo++;
    var newRepo = new Repo({
      id: repo.id,
      name: repo.name,
      owner_login: repo.owner.login,
      forks: repo.fork,
      description: repo.description,
      html_url: repo.owner.html_url,
      updated_at: repo.updated_at
    })
    newRepo.save(newRepo, (err, response) => {
      if (err) {
        callback(err);
      } else {
        successRepos++;
        if (successRepos === repos.length - 1) {
          callback(null, response)
        }
      }
    })
  })
}
// Model methods GET:
var getDataFomDB = (username, callback) => {
  // Repo.find({ owner_login: username }, (err, response) => {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(null, response);
  //   }
  // })
  // ALSO WORK:

  Repo.find({ owner_login: username })
    .then((response) => { callback(null, response) })
    .catch((e) => { callback(e) })
}
// Model methods GET_ALL:
var getAllDataFromDB = (callback) => {
  Repo.find({}, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(null, response);
    }
  })
}

module.exports = {
  Repo: Repo,
  saveDataToDB,
  getDataFomDB,
  getAllDataFromDB
}