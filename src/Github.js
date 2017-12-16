import React, { Component } from 'react';
import Search from './Components/Search';
import Profile from './Components/Profile';

const API = 'https://api.github.com/users';

class Github extends Component {
  constructor(props){
    super(props);
    this.getProfile = this.getProfile.bind(this);
    this.state = {
      username: '',
      name: '',
      avatar: '',
      repos: '',
      followers: '',
      following: '',
      homeURL: '',
      notFound: ''
    };
  }
  getProfile(username) {
    let finalURL = `${API}/${username}`;

    fetch(finalURL)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        notFound: data.message
      })
    })
    .catch((err) => console.log('There is a problem when fetching data'))
  }
  componentDidMount() {
    this.getProfile(this.state.username);
  }
  render(){
    return(
      <div>
        <section id="card">
          <Search searchProfile={this.getProfile} />
          <Profile userData={this.state} />
        </section>
      </div>
    );
  }
}

export default Github;
