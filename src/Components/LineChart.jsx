import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect } from "react";

export default function Chart({ points }) {

    const [options, setOptions] = useState({
        chart: {
            type: 'areaspline',
            styleMode: true,
            backgroundColor: 'transparent',
            height: '220px',
        },

        title: {
            text: ""
        },

        xAxis: {
            // tickInterval: 2,
            labels: {
                step: 1,
                style: {
                    color: "#000000",
                    opacity: 0.4,
                    fontFamily: 'poppins',
                    fontSize: '12px',
                    fontWeight: 400,
                },
            },
            gridLineWidth: 1,
            gridZIndex: 2,
            allowDecimals: false,
            tickLength: 0,
            
        },

        yAxis: {
            enabled: false,
            title: {
                text: "",
            },
            labels: {
                enabled: false,
            },
            gridLineColor: null,
            style: {
                fontFamily: 'poppins',
                fontSize: '12px',
                fontWeight: '400',
                color: '#000000',},
            
        },

        plotOptions: {
            series: {
                pointStart: 2023,
                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, 'rgba(0, 221, 111, 0.65)'],
                        [1, 'rgba(204, 255, 230,0.2)']
                    ]
                }
            },
            areaspline: {
                color: '#00DD6F',
            },

        },

        tooltip: {
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            borderRadius: 20,
            useHTML: true,
            formatter: function() {
                return `<span style="color:#979797"> Amount    <span style="color:#1B1C20; font-weight: 600;">\u20B9 ${Number(this.y.toFixed(0)).toLocaleString("en-In")}</span> <br> Year    <span style="color:#1B1C20; font-weight: 600;"> ${this.x} </span> </span>`
            }
        },

        legend: {
            enabled: false,
        },

        series: [
            {
                name: 'F',
                data: null,
            }
        ],

        credits: {
            enabled: false
        },

    });

    useEffect(() => {
        setOptions(previousState => {
            return ({
                ...previousState, series: {
                    data: points,
                }
            })
        })
    }, [points]);

    return (

        <HighchartsReact highcharts={Highcharts} options={options} />

    )
}