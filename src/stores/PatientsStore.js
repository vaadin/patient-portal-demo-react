import BaseStore from './BaseStore';

class PatientsStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._patients = [];
    this._currentPatientId = null;
    this._currentPatient = {};
    this._journalEntries = [];
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case 'SET_PATIENTS':
        this._patients = action.patients;
        this._setCurrentPatient();
        this.emitChange();
        break;
      case 'SET_CURRENT_PATIENT':
        this._currentPatientId = action.id;
        this._setCurrentPatient();
        this.emitChange();
        break;
      case 'CLEAR_CURRENT_PATIENT':
        this._currentPatientId = null;
        this._currentPatient = {};
        this.emitChange();
        break;
      case 'SET_JOURNAL_ENTRIES':
        this._journalEntries = action.entries;
        break;
      default:
        break;
    }
  }

  _setCurrentPatient() {
    if (this._patients.length > 0 && this._currentPatientId) {
      this._currentPatient = this._patients
        .filter((patient) => {
          return patient.id === parseInt(this._currentPatientId, 10);
        })[0];
    }
  }

  get patients() {
    return this._patients;
  }

  get currentPatientId() {
    return this._currentPatientId;
  }

  get currentPatient() {
    return this._currentPatient;
  }

  get journalEntries() {
    return this._journalEntries;
  }
}

export default new PatientsStore();
