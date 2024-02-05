import React from 'react';
import { Line } from 'react-chartjs-2';

export default function IntensityChart({ intensityData }) {
    const filteredData = intensityData.filter(entry => entry.country !== '' && entry.country !== 'United States of America');

    const uniqueCountries = {};
    filteredData.forEach(entry => {
        if (uniqueCountries[entry.country]) {
            uniqueCountries[entry.country].intensity.push(entry.intensity);
        } else {
            uniqueCountries[entry.country] = {
                intensity: [entry.intensity],
                continent: entry.continent
            };
        }
    });

    const countryAverages = [];
    for (const country in uniqueCountries) {
        const intensities = uniqueCountries[country].intensity;
        const sum = intensities.reduce((acc, val) => acc + val, 0);
        const avgIntensity = sum / intensities.length;
        countryAverages.push({
            country: country,
            avgIntensity: avgIntensity,
            continent: uniqueCountries[country].continent
        });
    }

    const groupedByContinent = {};
    for (const country of countryAverages) {
        if (!groupedByContinent[country.continent]) {
            groupedByContinent[country.continent] = [];
        }
        groupedByContinent[country.continent].push(country);
    }

    const chartData = {
        labels:Object.keys(groupedByContinent),
        datasets: Object.values(groupedByContinent).map(data => ({
            label: data[0].continent,
            data: data.map(country => country.avgIntensity)
        }))
    };

    const chartOptions = {
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
        }
    };

    return (
        <div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}
