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
import PatientEdit from './components/patients/patientedit/PatientEdit';
import PatientJournal from './components/patients/patientjournal/PatientJournal';
import PatientJournalNew from './components/patients/patientjournalnew/PatientJournalNew';
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
        <Route path="/patients/:patientId/profile/edit" component={PatientEdit}/>
      </Route>
      <Route path="/analytics" component={Analytics}>
        <IndexRedirect to="/analytics/age" />
        <Route path="/analytics(/:chartType)" component={Analytics}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
