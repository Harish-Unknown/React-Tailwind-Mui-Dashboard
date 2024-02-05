import React from 'react';
import { Pie } from 'react-chartjs-2';

const PestFactorsDistributionChart = ({ pestFactorData }) => {

    const filteredData = pestFactorData.filter(item => item.pestle !== "");

    const pestleCounts = {};
    filteredData.forEach(item => {
        pestleCounts[item.pestle] = (pestleCounts[item.pestle] || 0) + 1;
    });

    const labels = Object.keys(pestleCounts);
    const data = Object.values(pestleCounts);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    'rgba(0, 149, 168, 0.6)',
                    'rgba(8, 22, 39, 0.6)',
                    'rgba(255, 112, 67, 0.6)',
                    'rgba(120, 144, 156, 0.6)',
                    'rgba(165, 105, 189 , 0.6)',
                    'rgba(82, 190, 128, 0.6)',
                    'rgba(244, 208, 63, 0.6)',
                    'rgba(236, 112, 99 , 0.6)',
                    'rgba(211, 84, 0 , 0.6)',
                ],
                hoverBackgroundColor: [
                    'rgba(0, 149, 168, 0.8)',
                    'rgba(8, 22, 39, 0.8)',
                    'rgba(255, 112, 67, 0.8)',
                    'rgba(120, 144, 156, 0.8)',
                    'rgba(165, 105, 189 , 0.8)',
                    'rgba(82, 190, 128, 0.8)',
                    'rgba(244, 208, 63, 0.8)',
                    'rgba(236, 112, 99 , 0.8)',
                    'rgba(211, 84, 0 , 0.8)',
                ],
            },
        ],
    };

    const chartOptions = {
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
            x: {
                ticks: {
                    color: 'transparent'
                },
                grid: {
                    color: 'transparent'
                }
            },
            y: {
                ticks: {
                    color: 'transparent'
                },
                grid: {
                    color: 'transparent'
                }
            }
        }
    };

    return (
        <div>
            <Pie data={chartData} options={chartOptions} />
        </div>
    );
};

export default PestFactorsDistributionChart;
