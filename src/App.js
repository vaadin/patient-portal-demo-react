import React, { Component } from 'react';
import { Link } from 'react-router';
import LoginActions from './actions/LoginActions';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }
  logOut() {
    LoginActions.logoutUser();
  }
  render() {
    return (
      <div className="container">
        <nav className="menu">
          <Link to={`/patients`}>Patients</Link>
          <Link to={`/analytics`}>Patients</Link>
          <Link to={`/login`} className="right" onClick={this.logOut}><i className="fa fa-sign-out"></i> Logout</Link>
        </nav>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
