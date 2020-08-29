const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', () => console.error('Error: '));
db.once('open', () => {
  console.log('mongodb connected!');
});

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  owner_id: Number,
  owner_login: String,
  private: String,
  forks: Number,
  language: String,
  description: String,
  html_url: String,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, callback) => {
  repoData.forEach(repo => {
    // search by id
    Repo.find({ id: repo.id })
      .then(function (oldDoc) {
        var isUpToDate;
        if (Object.keys(oldDoc).length > 0) {
          isUpToDate = true;
        }
        if (!isUpToDate) {
          var newRepo = new Repo(repo);
          newRepo.save((err, newRepo) => {
            if (err) {
              console.error('Error: ', err);
            } else {
              console.log('stored repo');
            }
          });
        }
      })
      .catch(err => {
        console.error('Error: ', err);
      });
    // console.log('Saving repo: ', repo);
  });
};

let get = (user, callback) => {
  console.log('user', user);
  Repo.find({ owner_login: user }).then((err, repos) => {
    console.log('we got em boys');
    if (err) {
      console.error('Error: ', err);
    } else {
      return callback(repos);
    }
  });
  // .catch(err => console.error('Error: ', err));
};

module.exports.save = save;
module.exports.get = get;
module.exports.Repo = Repo;