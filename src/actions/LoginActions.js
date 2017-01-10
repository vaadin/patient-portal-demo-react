import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { browserHistory } from 'react-router';

export default {
  loginUser: (jwt) => {
    var savedJwt = localStorage.getItem('jwt');

    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      jwt: jwt
    });

    if (savedJwt === jwt && browserHistory.getCurrentLocation().pathname === '/login') {
      browserHistory.push('/');
    } else if (savedJwt !== jwt) {
      localStorage.setItem('jwt', jwt);
      browserHistory.push('/');
    }
  },
  logoutUser: () => {
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: 'LOGOUT_USER'
    });
    browserHistory.push('/login');
  }
};
