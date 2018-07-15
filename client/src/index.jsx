import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    self = this;
    $.post('/repos', {name: term}, function(data) {
      self.setState({repos: data});
    });
  }

  componentDidMount() {
    //console.log('this is this', this);
    self = this;
    $.get('/repos', null, function(data) {
      //console.log(self)
      self.setState({repos: data})
    });
  }

  render () {

    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
