import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Line extends Component {
  constructor(props) {
    super(props);
    console.log(props.Personality)
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
        // data: [props.Personality, props.Job, props.Debate, props.PT]
        data: [9, 9, 5, 1]
      }],
    }
  }
  

  render() {

    return (
      <span className="line">
        <Chart options={this.state.options} series={this.state.series} type="line" width="300" />
      </span>
    );
  }
}

export default Line;
