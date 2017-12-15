import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
  onLogin() {
    this.props.onLogin();
  }
  onLogout() {
    this.props.onLogout();
  }
  render(){
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Github Searcher
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {!this.props.idToken ?
          <NavItem onClick={this.onLogin.bind(this)} href="#">Login</NavItem> :
          <NavItem onClick={this.onLogout.bind(this)} href="#">Logout</NavItem>}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
