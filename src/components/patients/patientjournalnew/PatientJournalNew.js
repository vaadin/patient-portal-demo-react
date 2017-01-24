import React, { Component } from 'react';
import './PatientJournalNew.css';
import { Link, browserHistory } from 'react-router';
import PatientsService from '../../../services/PatientsService';
import PatientsStore from '../../../stores/PatientsStore';
import Constants from '../../../Constants';

class PatientJournalNew extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      month = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1),
      date = today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();

    this.state = {
      date: today.getFullYear() + '-' + month + '-' + date,
      doctorId: '',
      doctor: {},
      doctors: [],
      appointmentTypes: Constants.APPOINTMENT_TYPES,
      appointmentType: '',
      patient: JSON.parse(JSON.stringify(PatientsStore.currentPatient)),
      entry: ''
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAppointmentChange = this.handleAppointmentChange.bind(this);
    this.handleDoctorChange = this.handleDoctorChange.bind(this);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getDoctors();
    // this.setAppointmentTypes();
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
    PatientsService.addJournalEntry(this.state)
      .done(() => {
        browserHistory.push('/patients/' + this.state.patient.id + '/journal');
      });
  }
  handleDateChange(event) {
    this.setState({date: event.target.value});
  }
  handleDoctorChange(event) {
    this.setState({doctorId: event.target.value});
    this.setState({doctor: this.state.doctors.filter((doctor) => {
      return doctor.id === parseInt(event.target.value, 10);
    })[0]});
  }
  handleAppointmentChange(event) {
    this.setState({appointmentType: event.target.value});
  }
  handleEntryChange(event) {
    this.setState({entry: event.target.value});
  }
  render() {
    return (
      <div>
      <header>
        <h1>New Journal Entry</h1>
        <Link to={'/patients/' + this.state.patient.id + '/journal'} className="close-link"><i className="fa fa-close"></i></Link>
      </header>

        <form onSubmit={this.handleSubmit}>

        <div className="form-details">
          <div className="field">
            <label>Patient</label>
            <span>{this.state.patient.lastName}, {this.state.patient.firstName}</span>
          </div>

          <div className="field">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" required value={this.state.date} onChange={this.handleDateChange} />
          </div>

          <div className="field">
            <label htmlFor="appointment">Appointment</label>
            <select id="appointment" name="appointmentType" required value={this.state.appointmentType} onChange={this.handleAppointmentChange}>
              <option></option>
              {
                this.state.appointmentTypes.map(function(appointment) {
                  return <option value={appointment.value} key={appointment.value}>{appointment.name}</option>
                })
              }
            </select>
          </div>

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
        </div>

        <div className="spacer"></div>

        <div className="field stacked centered notes">
          <label htmlFor="entry">Notes</label>
          <textarea id="entry" rows="15" name="entry" value={this.state.entry} onChange={this.handleEntryChange} required>
          </textarea>
        </div>

        <div className="buttons">
          <button className="primary" type="submit">Save</button>
          <Link to={'/patients/' + this.state.patient.id + '/journal'} className="button">Cancel</Link>
        </div>

        </form>
      </div>
    );
  }
}

export default PatientJournalNew;
