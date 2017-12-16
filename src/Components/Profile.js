import React, { Component } from 'react';

class Profile extends Component {
  render(){

    let userdata = this.props.userData;
    let followers = `${userdata.homeURL}/followers`;
    let following = `${userdata.homeURL}/following`;
    let repos = `${userdata.homeURL}/repositories`;

    return(
      <section className="github-profile">
        <div className="github-profile-info">
          <a href={userdata.homeURL} target="_blank" title={userdata.username || userdata.name}><img src={userdata.avatar} alt="" /></a>
          <h2><a href={userdata.homeURL} title={userdata.username} traget="_blank">{userdata.name || userdata.username}</a></h2>
          <h3>{userdata.location}</h3>
        </div>
        <div className="github-profile-state">
          <ul>
            <li>
              <a href={followers} target="_blank" title="Number of followers"><i>{userdata.followers}</i><span>Followers</span></a>
            </li>
            <li>
              <a href={following} target="_blank" title="Number of Following"><i>{userdata.following}</i><span>Following</span></a>
            </li>
            <li>
              <a href={repos} target="_blank" title="Number of Repositories"><i>{userdata.repos}</i><span>Repositories</span></a>
            </li>
          </ul>
        </div>
      </section>
      );
  }
}

export default Profile;
