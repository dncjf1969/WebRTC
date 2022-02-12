import React from 'react';
import Chart from 'react-apexcharts'

export default function Donut (props) {

    const options = {
      labels: ['인성면접', '직무면접', '토론면접', 'PT면접']
    }

    const series = [props.Personality, props.Job, props.Debate, props.PT]
    
  



    return (
      <span className="donut">
        <Chart options={options} series={series} type="donut" width="300" />
      </span>
    );
  
}
