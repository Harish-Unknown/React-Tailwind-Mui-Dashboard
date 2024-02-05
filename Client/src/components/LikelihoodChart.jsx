import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LikelihoodChart = ({ likelihoodData }) => {
    const [selectedYear, setSelectedYear] = useState('2014'); // Set default year to 2014
    const [selectedHalfYear, setSelectedHalfYear] = useState('');
    const [yearsWithData, setYearsWithData] = useState([]);

    useEffect(() => {
        const allYears = [...new Set(likelihoodData.map(entry => new Date(entry.published).getFullYear()))];
        const filteredYears = allYears.filter(year => year !== 2007 && year !== 2012 && year !== 2020 && !isNaN(year));
        setYearsWithData(filteredYears);
    }, [likelihoodData]);


    const manualColors = [
        'rgba(0, 149, 168, 0.8)',
        'rgba(8, 22, 39, 0.8)',
        'rgba(255, 112, 67, 0.8)',
        'rgba(120, 144, 156, 0.8)',
        'rgba(165, 105, 189 , 0.8)',
        'rgba(82, 190, 128, 0.8)',
        'rgba(244, 208, 63, 0.8)',
        'rgba(236, 112, 99 , 0.8)',
        'rgba(211, 84, 0 , 0.8)'
    ];


    const shuffle = array => {
        let currentIndex = array.length, temporaryValue, randomIndex;

   
        while (currentIndex !== 0) {      
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    const filteredData = likelihoodData.filter(entry => {
        const yearMatches = selectedYear ? new Date(entry.published).getFullYear() === parseInt(selectedYear) : true;
        const halfYearMatches = selectedHalfYear ?
            selectedHalfYear === 'firstHalf' ? new Date(entry.published).getMonth() < 6 : new Date(entry.published).getMonth() >= 6
            : true;
        return yearMatches && halfYearMatches;
    });


    const validData = filteredData.filter(entry => !isNaN(new Date(entry.published).getTime()));

    const uniqueDates = new Set(validData.map(entry => {
        const date = new Date(entry.published);
        return `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
    }));

    const years = Array.from(uniqueDates).map(date => date.split('-')[1]); 

    const shuffledColors = shuffle([...manualColors]);

    const colorMap = {}; 
    years.forEach((year, index) => {
        colorMap[year] = shuffledColors[index % shuffledColors.length];
    });

    const chartData = {
        labels: Array.from(uniqueDates),
        datasets: [
            {
                label: 'Likelihood Over Time',
                data: validData.map(entry => entry.likelihood),
                fill: false,
                borderColor: validData.map(entry => colorMap[new Date(entry.published).getFullYear()]),
                tension: 0.1,
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
                    color: 'gray'
                },
                grid: {
                    color: 'gray'
                }
            },
            y: {
                ticks: {
                    color: 'gray'
                },
                grid: {
                    color: 'gray'
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };
    

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <label htmlFor="yearFilter" className="font-bold text-gray-500">Filter by Year:</label>
                <select id="yearFilter" value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="px-4 py-2 bg-gray-400 rounded border border-gray-300">
                    <option value="">All Years</option>
                    {yearsWithData.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <label htmlFor="halfYearFilter" className="font-bold text-gray-500">Select Half-Year:</label>
                <select id="halfYearFilter" value={selectedHalfYear} onChange={e => setSelectedHalfYear(e.target.value)} className="px-4 py-2 bg-gray-400 rounded border border-gray-300">
                    <option value="">All</option>
                    <option value="firstHalf">First Half (Jan-Jun)</option>
                    <option value="secondHalf">Second Half (Jul-Dec)</option>
                </select>
            </div>
            <div className="chart-container h-[500px]">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default LikelihoodChart;
