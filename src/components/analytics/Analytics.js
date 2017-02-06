import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import { Link, browserHistory } from 'react-router';
import Charts from 'react-chartjs';

import './Analytics.css';
import AnalyticsService from '../../services/AnalyticsService';
import AnalyticsStore from '../../stores/AnalyticsStore';

const BarChart = Charts.Bar;
const dataTypes = ['age', 'doctor', 'gender'];

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
        switch (type) {
          case 'age':
            this.setState({chartData: AnalyticsStore.ages});
            break;
          case 'doctor':
            this.setState({chartData: AnalyticsStore.doctors});
            break;
          case 'gender':
            this.setState({chartData: AnalyticsStore.genders});
            break;
        }
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
