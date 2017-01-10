import request from 'reqwest';
import when from 'when';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(username, password) {
    return this.handleAuth(when(request({
      url: 'http://localhost:8080/login',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        username: username,
        password: password
      })
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.getResponseHeader('Authorization');
        LoginActions.loginUser(jwt);
        return true;
      });
  }
}

export default new AuthService();
