import request from 'reqwest';
import when from 'when';
import LoginStore from '../stores/LoginStore';
import AnalyticsActions from '../actions/AnalyticsActions';

class AnalyticsService {

  getData(type) {
    return this._handleGetData(when(request({
      url: 'http://localhost:8080/analytics/'+type,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      headers: {
        'authorization': LoginStore.jwt
      }
    })), type);
  }

  _handleGetData(dataPromise, type) {
    return dataPromise
      .then(function(data) {
        switch (type) {
          case 'age':
            AnalyticsActions.setAgeData(data);
            break;
          case 'doctor':
            AnalyticsActions.setDoctorData(data);
            break;
          case 'gender':
            AnalyticsActions.setGenderData(data);
            break;
        }
        return data;
      });
  }
}

export default new AnalyticsService();
