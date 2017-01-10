import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
// Import App
import App from './App';
// Import Login
import Login from './login/Login';
import LoginActions from './actions/LoginActions';
// Import Patients
import Patients from './patients/Patients';
import PatientNew from './patients/PatientNew';
import PatientProfile from './patients/PatientProfile';
import PatientProfileEdit from './patients/PatientProfileEdit';
import PatientJournal from './patients/PatientJournal';
import PatientJournalNew from './patients/PatientJournalNew';
// Import Analytics
import Analytics from './analytics/Analytics';
// Import CSS
import './index.css';

let jwt = localStorage.getItem('jwt');
if (jwt) {
  LoginActions.loginUser(jwt);
} else if (browserHistory.getCurrentLocation().pathname !== '/login') {
  browserHistory.push('/login');
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="login" component={Login}/>
    <Route path="/" component={App}>
      <Route path="patients" component={Patients}>
        <Route path="/patients/new" component={PatientNew}/>
        <Route path="/patients/:patientId/profile" component={PatientProfile}/>
        <Route path="/patients/:patientId/profile/edit" component={PatientProfileEdit}/>
        <Route path="/patients/:patientId/journal" component={PatientJournal}/>
        <Route path="/patients/:patientId/journal/new" component={PatientJournalNew}/>
      </Route>
      <Route path="analytics" component={Analytics}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
