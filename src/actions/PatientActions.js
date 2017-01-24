import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
  setPatients: (patients) => {
    AppDispatcher.dispatch({
      actionType: 'SET_PATIENTS',
      patients: patients
    });
  },
  setCurrentPatient: (id) => {
    AppDispatcher.dispatch({
      actionType: 'SET_CURRENT_PATIENT',
      id: id
    });
  },
  setJournalEntries: (entries) => {
    AppDispatcher.dispatch({
      actionType: 'SET_JOURNAL_ENTRIES',
      entries: entries
    });
  }
};
