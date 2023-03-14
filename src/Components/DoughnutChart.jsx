import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect } from "react";

function DoughnutChart({ totalInterest, investmentAmount, maturityValue }) {

  const [option, setOptions] = useState({
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: '220px',
    },
    title: {
      text: '',
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        dataLabels: {
          enabled: false,
        }
      }
    },
    tooltip: {
      backgroundColor: '#FFFFFF',
      borderColor: '#FFFFFF',
      borderRadius: 20,
      style: {
        color: '#000000',
      },
      formatter() {
        // return `${this.key} <strong>\u20B9 ${this.y.toLocaleString("en-In")}</strong>`
        return `<span style="color:#979797"> ${this.key}    <span style="color:#1B1C20; font-weight: 600;">\u20B9 ${Number(this.y.toFixed(0)).toLocaleString("en-In")}</span> </span>`
      },
      labels: {
        enabled: false,
      }
    },
    series: [{
      data: null,
    }],
    credits: {
      enabled: false,
    }
  });

  useEffect(() => {
    setOptions(previousOptions => {
      return ({
        ...previousOptions,
        series: [{
          data: [
            {
              name: 'Total Investment',
              y: investmentAmount,
              color: '#0161FF',
              showInLegend: false,
            },
            {
              name: 'Total Interest',
              y: totalInterest,
              color: '#2ecc71',
              showInLegend: false,
            }
          ]
        }],
      })
    })
  }, [maturityValue])

  return (

    <HighchartsReact highcharts={Highcharts} options={option} />

  )
}

export default DoughnutChart;