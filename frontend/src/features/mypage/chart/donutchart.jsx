import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['인성면접', '직무면접', '토론면접', 'PT면접']
      },
      // series: [props.Personality, props.Job, props.Debate, props.PT]
      series: [1,6,8,9]

    }
  }

  render() {

    return (
      <span className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="300" />
      </span>
    );
  }
}

export default Donut;