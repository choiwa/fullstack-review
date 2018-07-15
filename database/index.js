const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connected");
})

let repoSchema = mongoose.Schema({
  _id: Number,
  repoName: String,
  ownerName: String,
  ownerId: Number,
  forksCount: Number
});

// turn this into model so it can be used
let Repo = mongoose.model('Repo', repoSchema);

//{repoId: 1, repoName: 'hello world', ownerName: 'joyce', ownerId: 1, forksCount:0}
let save = (repo) => {
  var newRepo = new Repo(repo);

  newRepo.save(function(err, newRepo) {
    if (err) return console.log(err);
  });
};

let findAll = (callback) => {
  Repo.find({}).limit(25).sort({forksCount: -1}).exec(callback);
}

module.exports = {
  save: save,
  findAll: findAll
}


//testing purpose
// save({_id: 1, repoName: 'hello world', ownerName: 'joyce', ownerId: 1, forksCount:0});

findAll(function(err, data) {
  console.log(data);
});
