import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
// Import App
import App from './App';
// Import Login
import Login from './components/login/Login';
import LoginActions from './actions/LoginActions';
// Import Patients
import Patients from './components/patients/Patients';
import PatientNew from './components/patients/patientnew/PatientNew';
import PatientDetailContainer from './components/patients/patientdetailcontainer/PatientDetailContainer';
import PatientProfile from './components/patients/patientprofile/PatientProfile';
import PatientProfileEdit from './components/patients/PatientProfileEdit';
import PatientJournal from './components/patients/PatientJournal';
import PatientJournalNew from './components/patients/PatientJournalNew';
// Import Analytics
import Analytics from './components/analytics/Analytics';
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
      <IndexRedirect to="/patients" />
      <Route path="patients" component={Patients}>
        <Route path="/patients/new" component={PatientNew}/>
        <Route path="/patients/:patientId" component={PatientDetailContainer}>
          <Route path="/patients/:patientId/profile" component={PatientProfile}/>
          <Route path="/patients/:patientId/journal" component={PatientJournal}/>
          <Route path="/patients/:patientId/journal/new" component={PatientJournalNew}/>
        </Route>
        <Route path="/patients/:patientId/profile/edit" component={PatientProfileEdit}/>
      </Route>
    </Route>
    <Route path="analytics" component={Analytics}/>
  </Router>,
  document.getElementById('root')
);
