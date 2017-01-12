import React, { Component } from 'react';
import './PatientEdit.css';
import { Link, browserHistory } from 'react-router';
import PatientActions from '../../../actions/PatientActions';
import PatientsService from '../../../services/PatientsService';
import PatientsStore from '../../../stores/PatientsStore';

class PatientEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      patient: {}
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleMiddleNameChange = this.handleMiddleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
    this.handleSsnChange = this.handleSsnChange.bind(this);
    this.handleDoctorChange = this.handleDoctorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deletePatient = this.deletePatient.bind(this);

    if (!PatientsStore.currentPatientId) {
      PatientActions.setCurrentPatient(location.pathname.replace('/patients/', '').replace('/profile', '').replace('/edit', ''));
    }
  }
  componentDidMount() {
    this.getDoctors();
    this.patientChangeListener = this._onPatientChange.bind(this);
    PatientsStore.addChangeListener(this.patientChangeListener);

    if (Object.keys(PatientsStore.currentPatient).length !== 0) {
      this._onPatientChange();
    }
  }
  componentWillUnmount() {
    PatientsStore.removeChangeListener(this.patientChangeListener);
  }
  _onPatientChange() {
    if (PatientsStore.currentPatient) {
      var patient = JSON.parse(JSON.stringify(PatientsStore.currentPatient)); // create a clone
      patient.doctorId = patient.doctor.id;
      this.setState({patient: patient});
    }
  }
  getDoctors() {
    PatientsService.getDoctors()
      .done((doctors) => {
        this.setState({doctors: doctors});
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    PatientsService.updatePatient(this.state.patient)
      .done((res) => {
        PatientsService.getPatients()
        .done(() => {
          browserHistory.push('/patients/' + PatientsStore.currentPatientId + '/profile');
        });
      });
  }
  deletePatient() {
    PatientsService.deleteCurrentPatient(this.state.patient.id)
      .done((res) => {
        PatientsService.getPatients()
        .done(() => {
          browserHistory.push('/patients');
        });
      });
  }
  handleTitleChange(event) {
    var patient = this.state.patient;
    patient.title = event.target.value;
    this.setState({patient: patient});
  }
  handleFirstNameChange(event) {
    var patient = this.state.patient;
    patient.firstName = event.target.value;
    this.setState({patient: patient});
  }
  handleMiddleNameChange(event) {
    var patient = this.state.patient;
    patient.middleName = event.target.value;
    this.setState({patient: patient});
  }
  handleLastNameChange(event) {
    var patient = this.state.patient;
    patient.lastName = event.target.value;
    this.setState({patient: patient});
  }
  handleGenderChange(event) {
    var patient = this.state.patient;
    patient.gender = event.target.value;
    this.setState({patient: patient});
  }
  handleBirthDateChange(event) {
    var patient = this.state.patient;
    patient.birthDate = event.target.value;
    this.setState({patient: patient});
  }
  handleSsnChange(event) {
    var patient = this.state.patient;
    patient.ssn = event.target.value;
    this.setState({patient: patient});
  }
  handleDoctorChange(event) {
    var patient = this.state.patient;
    patient.doctorId = event.target.value;
    patient.doctor = this.state.doctors.filter((doctor) => {
      return doctor.id === parseInt(event.target.value, 10);
    })[0];

    this.setState({patient: patient});
  }
  render() {
    return (
      <div className="profile-edit-view">
        <header>
          <h1>Editing profile</h1>
          <Link to={'/patients/' + PatientsStore._currentPatientId + '/profile'} className="close-link"><i className="fa fa-close"></i></Link>
        </header>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="spacer"></div>

            <div className="field">
              <label htmlFor="title">Title</label>
              <select id="title" required name="title" value={this.state.patient.title} onChange={this.handleTitleChange}>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
                <option value="Mr">Mr</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" name="firstName" required value={this.state.patient.firstName} onChange={this.handleFirstNameChange} />
            </div>
            <div className="field">
              <label htmlFor="middleName">Middle name</label>
              <input type="text" id="middleName" name="middleName" required value={this.state.patient.middleName} onChange={this.handleMiddleNameChange} />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" name="lastName" required value={this.state.patient.lastName} onChange={this.handleLastNameChange} />
            </div>

            <div className="spacer"></div>

            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select id="gender" required name="gender" value={this.state.patient.gender} onChange={this.handleGenderChange}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="birthDate">Date of birth</label>
              <input type="date" id="birthDate" name="birthDate" required value={this.state.patient.birthDate} onChange={this.handleBirthDateChange} />
            </div>

            <div className="field">
              <label htmlFor="ssn">SSN</label>
              <input type="text" id="ssn" name="ssn" pattern="\d{3}-\d{2}-\d{4}" required value={this.state.patient.ssn} onChange={this.handleSsnChange} />
            </div>

            <div className="spacer"></div>

            <div className="field">
              <label htmlFor="doctor">Doctor</label>
              <select id="doctor" name="doctor" required value={this.state.patient.doctorId} onChange={this.handleDoctorChange}>
                <option></option>
                {
                  this.state.doctors.map(function(doctor) {
                    return <option value={doctor.id} key={doctor.id}>{doctor.lastName}, {doctor.firstName}</option>
                  })
                }
              </select>
            </div>

            <footer>
              <button className="primary">Save</button>
              <Link to={'/patients/' + PatientsStore._currentPatientId + '/profile'} className="button">Cancel</Link>
              <button type="button" className="danger" onClick={this.deletePatient}>Delete</button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

export default PatientEdit;
