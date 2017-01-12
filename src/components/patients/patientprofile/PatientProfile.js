import React, { Component } from 'react';
import PatientsStore from '../../../stores/PatientsStore';
import './PatientProfile.css';

class PatientProfile extends Component {
  constructor() {
    super();
    this.initializeValues();
  }
  componentDidMount() {
    this.patientChangeListener = this._onPatientChange.bind(this);
    PatientsStore.addChangeListener(this.patientChangeListener);

    if(Object.keys(PatientsStore.currentPatient).length !== 0) {
      this.setState({patient: PatientsStore.currentPatient});
    }
  }
  componentWillUnmount() {
    PatientsStore.removeChangeListener(this.patientChangeListener);
  }
  initializeValues() {
    this.state = {
      patient: {}
    };
  }
  _onPatientChange() {
    this.setState({patient: PatientsStore.currentPatient});
  }
  renderDoctorName(doctor) {
    return doctor ? doctor.lastName + ', ' + doctor.firstName : '';
  }
  render() {
    return (
      <div className="patient-container">

        <div className="full-name">
          <div className="name-wrapper">
            <div className="label">First name</div>
            <div className="name first">{this.state.patient.firstName}</div>
          </div>
          <div className="name-wrapper">
            <div className="label">Middle name</div>
            <div className="name">{this.state.patient.middleName}</div>
          </div>
          <div className="name-wrapper">
            <div className="label">Last name</div>
            <div className="name">{this.state.patient.lastName}</div>
          </div>
        </div>

        <table className="patient-data">
          <tbody>
            <tr>
              <td className="label">Gender</td>
              <td className="value">{this.state.patient.gender}</td>
            </tr>
            <tr>
              <td className="label">Date of birth</td>
              <td className="value">{this.state.patient.birthdate}</td>
            </tr>
            <tr>
              <td className="label">SSN</td>
              <td className="value">{this.state.patient.ssn}</td>
            </tr>
            <tr>
              <td className="label">Patient Id</td>
              <td className="value">{this.state.patient.id}</td>
            </tr>
            <tr>
              <td className="label">Doctor</td>
              <td className="value">{this.renderDoctorName(this.state.patient.doctor)}</td>
            </tr>
            <tr>
              <td className="label">Medical Record</td>
              <td className="value">{this.state.patient.medicalRecord}</td>
            </tr>
            <tr>
              <td className="label">Last Visit</td>
              <td className="value">{this.state.patient.lastVisit}</td>
            </tr>
          </tbody>
        </table>
        <img className="profile-pic" alt={this.state.patient.lastName} src={this.state.patient.pictureUrl} />
      </div>
    );
  }
}

export default PatientProfile;
