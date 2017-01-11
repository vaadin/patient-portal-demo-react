import request from 'reqwest';
import when from 'when';
import LoginStore from '../stores/LoginStore';

class PatientsService {

  getPatients() {
    return when(request({
      url: 'http://localhost:8080/patients',
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      }
    }));
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

  _sortPatients() {

  }

  _parseDates() {

  }
}

export default new PatientsService();
