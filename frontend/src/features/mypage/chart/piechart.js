import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Line extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        stroke: {
          curve: 'smooth'
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: ['인성면접', '직무면접', '토론면접', 'PT면접']
        }
      },
      series: [{
        data: [3, 4, 2, 0]
      }],
    }
  }

  render() {

    return (
      <div className="line">
        <Chart options={this.state.options} series={this.state.series} type="line" width="500" />
      </div>
    );
  }
}

export default Line;
