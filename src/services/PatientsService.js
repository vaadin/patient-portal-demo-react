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

  deleteCurrentPatient() {

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

  _sortPatients() {

  }
}

export default new PatientsService();
