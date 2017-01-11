import React, { Component } from 'react';
import './Login.css';
import Auth from '../../services/AuthService';
import LoginActions from '../../actions/LoginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    var jwt = localStorage.getItem('jwt');
    if (jwt) {
      LoginActions.loginUser(jwt);
    }
  }
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    Auth.login(this.state.username, this.state.password)
      .catch(function(err) {
        var response = JSON.parse(err.response);
        this.setState({errorMsg: response.message});
    }.bind(this));
  }
  render() {
    return (
      <div className="login-view">
        <div className="login-box">
          <div className="form">
            <h1>Patient portal</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="field stacked">
                <label htmlFor="username">Username</label>
                <input autoFocus id="username" type="text" name="username" autoComplete="username" value={this.state.username} onChange={this.handleUsernameChange} required />
              </div>
              <div className="field stacked">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" autoComplete="password" value={this.state.password} onChange={this.handlePasswordChange} required />
              </div>
              <button type="submit" className="primary">Login</button>
            </form>
          </div>
          {this.state.errorMsg.length > 0 &&
            <div role="alert" className="alert error">
              <i className="fa fa-lock"></i>
              {this.state.errorMsg}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Login;
