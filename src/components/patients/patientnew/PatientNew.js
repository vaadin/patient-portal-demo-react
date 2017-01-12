import React, { Component } from 'react';
import './PatientNew.css';
import { Link, browserHistory } from 'react-router';
import PatientsService from '../../../services/PatientsService';

class PatientNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Miss',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: 'MALE',
      birthDate: '',
      ssn: '',
      doctorId: '',
      doctor: {},
      doctors: []
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
  }
  componentDidMount() {
    this.getDoctors();
  }
  getDoctors() {
    PatientsService.getDoctors()
      .done((doctors) => {
        this.setState({doctors: doctors});
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    PatientsService.savePatient(this.state)
      .done(() => {
        PatientsService.getPatients()
        .done(() => {
          browserHistory.push('/patients');
        });
      });
  }
  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }
  handleMiddleNameChange(event) {
    this.setState({middleName: event.target.value});
  }
  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }
  handleGenderChange(event) {
    this.setState({gender: event.target.value});
  }
  handleBirthDateChange(event) {
    this.setState({birthDate: event.target.value});
  }
  handleSsnChange(event) {
    this.setState({ssn: event.target.value});
  }
  handleDoctorChange(event) {
    this.setState({doctorId: event.target.value});
    this.setState({doctor: this.state.doctors.filter((doctor) => {
      return doctor.id === parseInt(event.target.value, 10);
    })[0]});
  }
  render() {
    return (
      <div className="profile-edit-view">
        <header>
          <h1>Create profile</h1>
          <Link to={`/patients`} className="close-link"><i className="fa fa-close"></i></Link>
        </header>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="spacer"></div>

            <div className="field">
              <label htmlFor="title">Title</label>
              <select id="title" required name="title" value={this.state.title} onChange={this.handleTitleChange}>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
                <option value="Mr">Mr</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" name="firstName" required value={this.state.firstName} onChange={this.handleFirstNameChange} />
            </div>
            <div className="field">
              <label htmlFor="middleName">Middle name</label>
              <input type="text" id="middleName" name="middleName" required value={this.state.middleName} onChange={this.handleMiddleNameChange} />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" name="lastName" required value={this.state.lastName} onChange={this.handleLastNameChange} />
            </div>

            <div className="spacer"></div>

            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select id="gender" required name="gender" value={this.state.gender} onChange={this.handleGenderChange}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="birthDate">Date of birth</label>
              <input type="date" id="birthDate" name="birthDate" required value={this.state.birthDate} onChange={this.handleBirthDateChange} />
            </div>

            <div className="field">
              <label htmlFor="ssn">SSN</label>
              <input type="text" id="ssn" name="ssn" pattern="\d{3}-\d{2}-\d{4}" required value={this.state.ssn} onChange={this.handleSsnChange} />
            </div>

            <div className="spacer"></div>

            <div className="field">
              <label htmlFor="doctor">Doctor</label>
              <select id="doctor" name="doctor" required value={this.state.doctorId} onChange={this.handleDoctorChange}>
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
              <Link to={`/patients`} className="button">Cancel</Link>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

export default PatientNew;
