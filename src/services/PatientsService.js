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

  }

  deleteCurrentPatient() {

  }

  savePatient() {

  }

  _sortPatients() {

  }

  _parseDates() {

  }
}

export default new PatientsService();
