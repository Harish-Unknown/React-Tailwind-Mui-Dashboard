import React, { Component } from 'react';
import Chart from 'chart.js/auto'; 

class CountryChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            chartData: [],
        };
        this.chartInstance = null;
    }

    componentDidMount() {
        const { countryData } = this.props;
        const storedChartData = this.retrieveDataFromStorage();

        if (storedChartData) {
            this.setState({ chartData: storedChartData }, () => {
                this.buildChart();
            });
        } else if (countryData && countryData.length > 0) {
            this.setState({ chartData: countryData }, () => {
                this.buildChart();
                this.storeDataInStorage(countryData);
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.countryData !== this.props.countryData) {
            const { countryData } = this.props;
            if (countryData && countryData.length > 0) {
                this.setState({ chartData: countryData }, () => {
                    this.updateChart();
                    this.storeDataInStorage(countryData);
                });
            }
        }
    }

    retrieveDataFromStorage() {
        const storedData = localStorage.getItem('chartData');
        return storedData ? JSON.parse(storedData) : null;
    }

    storeDataInStorage(data) {
        localStorage.setItem('chartData', JSON.stringify(data));
    }

    preprocessData(data) {
        return data.map(country => {
            if (country.country === 'United States of America') {
                return { ...country, country: 'USA' };
            }
            else if (country.country === 'Saudi Arabia'){
                return { ...country, country: 'Saudi'};
            }
            return country;
        });
    }

    buildChart() {
        const chartRef = this.chartRef.current.getContext('2d');
        let { chartData } = this.state;

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        chartData = this.preprocessData(chartData);

        chartData.sort((a, b) => b.count - a.count);

        const topCountries = chartData.slice(0, 10);
        const labels = topCountries.map(country => country.country);
        const counts = topCountries.map(country => country.count);

        const backgroundColors = [
            'rgba(0, 149, 168, 0.6)', 
            'rgba(8, 22, 39, 0.6)', 
            'rgba(255, 112, 67, 0.6)', 
            'rgba(120, 144, 156, 0.6)', 
            'rgba(165, 105, 189 , 0.6)', 
            'rgba(82, 190, 128, 0.6)', 
            'rgba(244, 208, 63, 0.6)', 
            'rgba(236, 112, 99 , 0.6)', 
        ];

        this.chartInstance = new Chart(chartRef, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Country Counts',
                        color: 'white',
                        data: counts,
                        backgroundColor: backgroundColors,
                        borderColor: backgroundColors,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: { 
                    legend: {
                      labels: {
                        color: "gray",  
                        font: {
                          size: 13, 
                        }
                      }
                    }
                  },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count',
                            color: 'gray'
                        },
                        grid: {
                            color: 'gray',
                            borderColor: 'white'  
                          },
                          tricks:{
                            color:'gray'
                          }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Country',
                            color: 'gray',
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0,
                            minRotation: 0,
                            color: 'gray'
                        },
                        grid: {
                            color: 'gray',
                            borderColor: 'white'  // <-- this line is answer to initial question
                          }
                    },
                },
            },
        });
    }

    updateChart() {
        const { chartData } = this.state;

        if (this.chartInstance) {
            chartData.sort((a, b) => b.count - a.count);
            const topCountries = chartData.slice(0, 10);
            const counts = topCountries.map(country => country.count);

            this.chartInstance.data.datasets[0].data = counts;
            this.chartInstance.update();
        }
    }

    render() {
        return (
            <div>
                <canvas ref={this.chartRef} />
            </div>
        );
    }
}

export default CountryChart;
