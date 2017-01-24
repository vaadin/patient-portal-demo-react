import request from 'reqwest';
import when from 'when';
import LoginStore from '../stores/LoginStore';
import PatientActions from '../actions/PatientActions';

class PatientsService {

  getPatients() {
    return this._handleGetPatients(when(request({
      url: 'http://localhost:8080/patients',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      }
    })));
  }

  getJournalEntries(id) {
    return this._handleGetJournalEntries(when(request({
      url: 'http://localhost:8080/patients/' + id + '/journalentries',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      }
    })));
  }

  _handleGetJournalEntries(journalPromise) {
    return journalPromise
      .then(function(journals) {
        PatientActions.setJournalEntries(journals);
        return journals;
      });
  }

  _handleGetPatients(patientsPromise) {
    return patientsPromise
      .then(function(patients) {
        PatientActions.setPatients(patients);
        return patients;
      });
  }

  setSorting() {

  }

  setCurrentPatient() {

  }

  newPatient() {

  }

  getDoctors() {
    return when(request({
      url: 'http://localhost:8080/doctors',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      }
    }));
  }

  deleteCurrentPatient(id) {
    return when(request({
      url: 'http://localhost:8080/patients/' + id,
      method: 'DELETE',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      },
      contentType: 'application/json',
      processData: false
    }));
  }

  savePatient(patient) {
    return when(request({
      url: 'http://localhost:8080/patients',
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      },
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        birthdate: patient.birthdate,
        doctor: patient.doctor,
        firstName: patient.firstName,
        gender: patient.gender,
        lastName: patient.lastName,
        middleName: patient.middleName,
        ssn: patient.ssn,
        title: patient.title
      })
    }));
  }

  updatePatient(patient) {
    return when(request({
      url: 'http://localhost:8080/patients/' + patient.id,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      },
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        id: patient.id,
        birthdate: patient.birthdate,
        doctor: patient.doctor,
        firstName: patient.firstName,
        gender: patient.gender,
        lastName: patient.lastName,
        middleName: patient.middleName,
        ssn: patient.ssn,
        title: patient.title
      })
    }));
  }

  addJournalEntry(data) {
    return when(request({
      url: 'http://localhost:8080/patients/' + data.patient.id + '/journalentries',
      method: 'PUT',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      },
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        appointmentType: data.appointmentType,
        date: data.date,
        doctor: data.doctor,
        entry: data.entry
      })
    }));
  }

  _sortPatients() {

  }
}

export default new PatientsService();
