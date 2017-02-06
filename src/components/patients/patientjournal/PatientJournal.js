import React, { Component } from 'react';
import 'fixed-data-table/dist/fixed-data-table.min.css';
import './PatientJournal.css';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import PatientsService from '../../../services/PatientsService';
import PatientsStore from '../../../stores/PatientsStore';
import { Link } from 'react-router';

class CollapseCell extends Component {
  render() {
    const {rowIndex, collapsedRows, callback, ...props} = this.props;
    return (
      <Cell {...props} onClick={() => callback(rowIndex)}>
        <a>
          {collapsedRows.has(rowIndex) &&
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H5v-2h14v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          }
          {!collapsedRows.has(rowIndex) &&
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          }
        </a>
      </Cell>
    );
  }
};

class DateCell extends Component {
  parseDate(date) {
    return new Date(date).toLocaleDateString();
  }
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {this.parseDate(data[rowIndex][field])}
      </Cell>
    );
  }
};

class DoctorCell extends Component {
  render() {
    const {rowIndex, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {data[rowIndex].doctor.lastName}, {data[rowIndex].doctor.firstName}
      </Cell>
    );
  }
};

class AppointmentCell extends Component {
  parseAppointment(appointment) {
    var readableValue = '';
    switch (appointment) {
      case 'NEW_PATIENT':
        readableValue = 'New Patient';
        break;
      case 'X_RAY':
        readableValue = 'X Ray';
        break;
      case 'SURGERY':
        readableValue = 'Surgery';
        break;
      case 'FOLLOW_UP':
        readableValue = 'Follow Up';
        break;
      default:
        return appointment;
    }
    return readableValue;
  }
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {this.parseAppointment(data[rowIndex][field])}
      </Cell>
    );
  }
};

class NoteCell extends Component {
  parseDate(note) {
    return note;
  }
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {this.parseDate(data[rowIndex][field])}
      </Cell>
    );
  }
};

class PatientJournal extends Component {
  constructor() {
    super();
    this.initializeValues();

    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._rowHeightGetter = this._rowHeightGetter.bind(this);
  }
  initializeValues() {
    this.state = {
      entries: [],
      collapsedRows: new Set()
    };
  }
  componentDidMount() {
    this.getEntries();
  }
  getEntries() {
    PatientsService.getJournalEntries(PatientsStore.currentPatientId)
      .done((entries) => {
        this.setState({entries: PatientsStore.journalEntries}); //needed so React will update the table when PatientsStore.patients change
      });
  }

  _rowHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 200 : 28;
  }

  _handleCollapseClick(rowIndex) {
    let {collapsedRows} = this.state;
    collapsedRows.has(rowIndex) ? collapsedRows.delete(rowIndex) : collapsedRows.add(rowIndex);
    this.setState({
      collapsedRows: collapsedRows
    });
  }

  render() {
    return (
      <div className="total-width">
        <Link to={'/patients/'+PatientsStore.currentPatientId+'/journal/new'} activeClassName="active" className="button primary add"><i className="fa fa-plus"></i> New Entry</Link>
        <div className="table-container">
          <Table
            rowsCount={PatientsStore.journalEntries.length}
            rowHeight={36}
            rowHeightGetter={this._rowHeightGetter}
            headerHeight={50}
            width={this.props.containerWidth}
            height={this.props.containerHeight - 40}
            className="table">
            <Column
              header={<Cell className="table-header"></Cell>}
              cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={this.state.collapsedRows} />}
              fixed={true}
              width={30}
            />
            <Column
              header={<Cell className="table-header">Date</Cell>}
              cell={
                <DateCell
                  data={PatientsStore.journalEntries}
                  field="date"
                />
              }
              flexGrow={1}
              width={50}
            />
            <Column
              header={<Cell className="table-header">Appointment</Cell>}
              cell={
                <AppointmentCell
                  data={PatientsStore.journalEntries}
                  field="appointmentType"
                />
              }
              flexGrow={2}
              width={50}
            />
            <Column
              header={<Cell className="table-header">DOCTOR</Cell>}
              cell={
                <DoctorCell
                  data={PatientsStore.journalEntries}
                />
              }
              flexGrow={1}
              width={100}
            />
            <Column
              header={<Cell className="table-header">Notes</Cell>}
              cell={
                <NoteCell
                  data={PatientsStore.journalEntries}
                  field="entry"
                  className="note-cell"
                />
              }
              flexGrow={2}
              width={200}
            />
          </Table>
        </div>
        <div className={this.state.sideDivClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dimensions()(PatientJournal);
