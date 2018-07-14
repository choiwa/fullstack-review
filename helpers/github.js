const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  console.log('this is github tab', `/orgs/${username.name}/repos`);
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username.name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function(error, response, body) {
    console.log(JSON.parse(body));
  })
}

module.exports.getReposByUsername = getReposByUsername;
