import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import Header from './Components/Header';
import Github from './Github';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.showLock = this.showLock.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      idToken: '',
      profile: {}
    };
  }
  static defaultProps = {
    clientId: 'WO9WOU3rN3YiNMlrxmMBBOQ4UDzOYFiT',
    domain: 'mahi-react.auth0.com'
  }
  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if(error) {
          console.log(error);
          return;
        }
        this.setProfile(authResult.idToken, profile);
      });
    });
    this.getProfile();
  }
  setProfile(idToken, profile) {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }
  getProfile() { // if new login not occurs, lets the previous user logged in
    if(localStorage.getItem('idToken') != null) {
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.stringify(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      });
    }
  }
  showLock() {
    this.lock.show();
  }
  logout() {
    this.setState({
      idToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
  }
  render() {
    let gitty;
    if(this.state.idToken) {
      gitty = <Github />;
    } else {
      gitty = "Click on Login to view the Github Viewer";
    }
    return (
      <div className="App">
        <Header
          lock={this.lock}
          idToken={this.state.idToken}
          profile={this.state.profile}
          onLogin={this.showLock}
          onLogout={this.logout}
        />
        {gitty}
      </div>
    );
  }
}

export default App;
