import React, { Component } from 'react';
import { Link } from 'react-router';
import './PatientDetailContainer.css';
import PatientActions from '../../../actions/PatientActions';
import PatientsStore from '../../../stores/PatientsStore';

class PatientDetailContainer extends Component {
  constructor() {
    super();
    if (!PatientsStore.currentPatientId) {
      PatientActions.setCurrentPatient(location.pathname.replace('/patients/', '').replace('/profile', '').replace('/journal', '').replace('/new', '')); // stupid hack :(
    }
  }
  render() {
    return (
      <div className="patient-detail-container">
        <nav className="details-nav">
          <Link to={`/patients`} className="button add"><i className="fa fa-long-arrow-left"></i> <span className="linktext">All patients</span></Link>
          <div className="sub-pages">
            <Link to={'/patients/' + PatientsStore._currentPatientId + '/profile'} className="item" activeClassName="patient-detail-active">Profile</Link>
            <Link to={'/patients/' + PatientsStore._currentPatientId + '/journal'} className="item" activeClassName="patient-detail-active">Journal</Link>
          </div>
          <Link to={'/patients/' + PatientsStore._currentPatientId + '/profile/edit'}>Edit patient</Link>
        </nav>
        <div className="patient-detail-container-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PatientDetailContainer;
