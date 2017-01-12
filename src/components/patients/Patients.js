import React, { Component } from 'react';
import 'fixed-data-table/dist/fixed-data-table.min.css';
import './Patients.css';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import PatientsService from '../../services/PatientsService';
import PatientActions from '../../actions/PatientActions';
import PatientsStore from '../../stores/PatientsStore';
import { Link, browserHistory  } from 'react-router';

class TextCell extends Component {
  render() {
    const {rowIndex, field, data, parent, ...props} = this.props;
    return (
      <Cell {...props} onClick={parent.openPatient.bind(parent, data[rowIndex], parent)}>
        {data[rowIndex][field]}
      </Cell>
    );
  }
};

class NameCell extends Component {
  render() {
    const {rowIndex, data, parent, ...props} = this.props;
    return (
      <Cell {...props} onClick={parent.openPatient.bind(parent, data[rowIndex], parent)}>
        {data[rowIndex].lastName}, {data[rowIndex].firstName}
      </Cell>
    );
  }
};

class DoctorCell extends Component {
  render() {
    const {rowIndex, data, parent, ...props} = this.props;
    return (
      <Cell {...props} onClick={parent.openPatient.bind(parent, data[rowIndex], parent)}>
        {data[rowIndex].doctor.lastName}, {data[rowIndex].doctor.firstName}
      </Cell>
    );
  }
};

class DateCell extends Component {
  parseDate(date) {
    return new Date(date).toLocaleDateString();
  }
  render() {
    const {rowIndex, field, data, parent, ...props} = this.props;
    return (
      <Cell {...props} onClick={parent.openPatient.bind(parent, data[rowIndex], parent)}>
        {this.parseDate(data[rowIndex][field])}
      </Cell>
    );
  }
};

class Patients extends Component {
  constructor() {
    super();
    this.initializeValues();
    this.initializeRouting();
  }
  componentDidMount() {
    this.updatePatients();
    this.setSideDivClass(location.pathname === '/patients');
  }
  componentWillUnmount() {
    this.unListenBrowserHistory();
  }
  initializeValues() {
    this.state = {
      patients: [],
      sideDivClass: ''
    };
  }
  initializeRouting() {
    this.unListenBrowserHistory = browserHistory.listen( location =>  {
      this.setSideDivClass(location.pathname === '/patients');
      if (location.pathname === '/patients') {
        this.updatePatients(); // hack for updating the list after adding a new patient
      }
    });
  }
  setSideDivClass(patientsRoute) {
    this.setState({sideDivClass: patientsRoute ? 'details' : 'details open'});
  }
  updatePatients() {
    PatientsService.getPatients()
      .done((patients) => {
        this.setState({patients: PatientsStore.patients}); //needed so React will update the table when PatientsStore.patients change
      });
  }
  openPatient(row) {
    PatientActions.setCurrentPatient(row.id);
    browserHistory.push('/patients/' + row.id +'/profile');
  }
  render() {
    return (
      <div className="total-width">
        <Link to={`/patients/new`} activeClassName="active" className="button primary add"><i className="fa fa-plus"></i> Add new patient</Link>
        <div className="table-container">
          <Table
            rowsCount={PatientsStore.patients.length}
            rowHeight={36}
            headerHeight={50}
            width={this.props.containerWidth}
            height={this.props.containerHeight - 40}
            className="table">
            <Column
              header={<Cell className="table-header">NAME</Cell>}
              cell={
                <NameCell
                  data={PatientsStore.patients}
                  parent={this}
                />
              }
              width={200}
            />
            <Column
              header={<Cell className="table-header">ID</Cell>}
              cell={
                <TextCell
                  data={PatientsStore.patients}
                  field="id"
                  parent={this}
                />
              }
              flexGrow={2}
              width={50}
            />
            <Column
              header={<Cell className="table-header">DOCTOR</Cell>}
              cell={
                <DoctorCell
                  data={PatientsStore.patients}
                  parent={this}
                />
              }
              flexGrow={1}
              width={200}
            />
            <Column
              header={<Cell className="table-header">LAST ENTRY</Cell>}
              cell={
                <DateCell
                  data={PatientsStore.patients}
                  field="lastEntry"
                  parent={this}
                />
              }
              flexGrow={1}
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

export default Dimensions()(Patients);
