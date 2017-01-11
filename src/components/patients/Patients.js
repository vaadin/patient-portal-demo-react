import React, { Component } from 'react';
import 'fixed-data-table/dist/fixed-data-table.min.css';
import './Patients.css';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import PatientsService from '../../services/PatientsService';
import { Link } from 'react-router';

class TextCell extends Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {data[rowIndex][field]}
      </Cell>
    );
  }
};

class NameCell extends Component {
  render() {
    const {rowIndex, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {data[rowIndex].lastName}, {data[rowIndex].firstName}
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

class Patients extends Component {
  constructor() {
    super();
    this.initializePatients();
    this.updatePatients();
  }
  initializePatients() {
    this.state = {
      patients: [],
    };
  }
  updatePatients() {
    PatientsService.getPatients()
      .done((patients) => {
        this.state = {
          patients: patients
        };
        this.forceUpdate();
      });
  }
  render() {
    return (
      <div className="total-width">
        <Link to={`/patients/new`} activeClassName="active" className="button primary add"><i className="fa fa-plus"></i> Add new patient</Link>
        <Table
          rowsCount={this.state.patients.length}
          rowHeight={36}
          headerHeight={50}
          width={this.props.containerWidth}
          height={this.props.containerHeight}
          className="table">
          <Column
            header={<Cell className="table-header">NAME</Cell>}
            cell={
              <NameCell
                data={this.state.patients}
              />
            }
            width={200}
          />
          <Column
            header={<Cell className="table-header">ID</Cell>}
            cell={
              <TextCell
                data={this.state.patients}
                field="id"
              />
            }
            flexGrow={2}
            width={50}
          />
          <Column
            header={<Cell className="table-header">DOCTOR</Cell>}
            cell={
              <DoctorCell
                data={this.state.patients}
              />
            }
            flexGrow={1}
            width={200}
          />
          <Column
            header={<Cell className="table-header">LAST ENTRY</Cell>}
            cell={
              <DateCell
                data={this.state.patients}
                field="lastEntry"
              />
            }
            flexGrow={1}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

export default Dimensions()(Patients);
