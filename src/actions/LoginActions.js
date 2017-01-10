import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
  loginUser: (jwt) => {
    var savedJwt = localStorage.getItem('jwt');

    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      jwt: jwt
    });

    if (savedJwt !== jwt) {
      /*var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);*/
      console.log('TODO CHANGE PATH');
      localStorage.setItem('jwt', jwt);
    }
  },
  logoutUser: () => {
  console.log('TODO CHANGE PATH ON LOGOUT');
    //RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: 'LOGOUT_USER'
    });
  }
};
