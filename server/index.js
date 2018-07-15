const express = require('express');
let app = express();
let database = require('../database/index.js');
let bodyParser = require('body-parser');
let github = require('../helpers/github.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  console.log('im here', req.body)
  var result = github.getReposByUsername(req.body, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      var savedRepo = [];
      // result.forEach(repo=> {
      //   console.log(repo.name, repo.id, repo.owner.login);
      // })
      result.forEach(repo => {
        var information = {_id: repo.id, repoName: repo.name, ownerName: repo.owner.login, ownerId: repo.owner.id, forksCount: repo.forks};

        database.save(information);
        savedRepo.push(information);
      })
      res.send(savedRepo);
    }
  });

  //repo.save(req.body);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
