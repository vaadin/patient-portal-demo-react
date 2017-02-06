import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
  setAgeData: (data) => {
    AppDispatcher.dispatch({
      actionType: 'SET_AGE_DATA',
      data: data
    });
  },
  setDoctorData: (data) => {
    AppDispatcher.dispatch({
      actionType: 'SET_DOCTOR_DATA',
      data: data
    });
  },
  setGenderData: (data) => {
    AppDispatcher.dispatch({
      actionType: 'SET_GENDER_DATA',
      data: data
    });
  },
};
