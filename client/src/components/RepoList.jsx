import React from 'react';

const RepoList = (props) => {

return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo) => {
      return <div> Repo Name: {repo.repoName}
              <div> Owner Name:{repo.ownerName}
              </div>
            </div>
    })}
  </div>)
}

export default RepoList;
