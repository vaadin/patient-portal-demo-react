import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import { Link, browserHistory } from 'react-router';
import Charts from 'react-chartjs';

import './Analytics.css';
import AnalyticsService from '../../services/AnalyticsService';
import AnalyticsStore from '../../stores/AnalyticsStore';

const BarChart = Charts.Bar;
const dataTypes = ['age', 'doctor', 'gender'];

const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
        }
    ]
};

const chartOptions = {
  responsive: true
};

class Analytics extends Component {
  constructor() {
    super();
    this.initializeRouting();
    this.initializeValues();
  }
  initializeValues() {
    this.state = {
      chartData: {
        labels: [],
        datasets: [{}]
      }
    };
  }
  initializeRouting() {
    this.unListenBrowserHistory = browserHistory.listen( location =>  {
      let chartType = location.pathname.replace('/analytics/', '');
      if (dataTypes.indexOf(chartType) > -1) {
        this.setChartData(chartType);
      }
    });
  }
  componentDidMount() {
    if (!this.props.params.chartType || dataTypes.indexOf(this.props.params.chartType) < 0) {
      this.props.params.chartType = 'age';
    }
    this.setChartData(this.props.params.chartType);
  }
  setChartData(type) {
    AnalyticsService.getData(type)
      .done((data) => {
        // switch (type) {
        //   case 'age':
        //     this.formatAgeData(data);
        //     break;
        //   case 'doctor':
        //     this.formatDoctorData(data);
        //     break;
        //   case 'gender':
        //     this.formatAgeData(data);
        //     break;
        // }
        // console.log(data);
        console.log(chartData);
        console.log(AnalyticsStore.ages);
        this.setState({chartData: AnalyticsStore.ages}); //needed so React will update the table when PatientsStore.patients change
      });
  }
  componentWillUnmount() {
    this.unListenBrowserHistory();
  }
  render() {
    return (
      <div>
      <nav className="analytics-nav">
        <Link to={`/analytics/age`} activeClassName="active">Age</Link>
        <Link to={`/analytics/doctor`} activeClassName="active">Doctor</Link>
        <Link to={`/analytics/gender`} activeClassName="active">Gender</Link>
      </nav>
        <BarChart data={this.state.chartData} options={chartOptions} width="600" height="250"/>
      </div>
    );
  }
}

export default Dimensions()(Analytics);
