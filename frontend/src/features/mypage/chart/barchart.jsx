import React from 'react';
import Chart from 'react-apexcharts'

export default function Bar (props)  {
  const options = {
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      categories: ['인성면접', '직무면접', '토론면접', 'PT면접']
    }
  }
  
  const series = [{
    data: [props.Personality, props.Job, props.Debate, props.PT]
  }]
 
  
  // componentDidMount(props) {
  //   console.log(this.props)
  // };
  

    return (
      <span className="bar">
        <Chart options={options} series={series} type="bar" width="300" />
      </span>
    );
  
}

