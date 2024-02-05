import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntensityChart from './IntensityChart';

export default function Intensity() {
    const [intensityData, setIntensityData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/getdata'; 

        axios.get(apiUrl)
            .then(response => {
                const transformedData = response.data.map(entry => ({
                    country: entry.country,
                    intensity: entry.intensity
                }));
                setIntensityData(transformedData);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Manually add continent data
    const intensityDataWithContinent = intensityData.map(entry => ({
        ...entry,
        continent: getContinent(entry.country)
    }));

    return (
        <div>
            <h2 className='text-gray-400 mb-2'>Average Intensity by Country</h2>
            <IntensityChart intensityData={intensityDataWithContinent} />
        </div>
    );
}

function getContinent(country) {
    switch (country) {
        case 'China':
        case 'India':
        case 'Iran':
        case 'Indonesia':
        case 'Japan':
        case 'Saudi Arabia':
        case 'Syria':
        case 'Iraq':
        case 'Malaysia':
        case 'South Korea':
        case 'Pakistan':
            return 'Asia';
        case 'Germany':
        case 'United Kingdom':
        case 'Russia':
        case 'Hungary':
        case 'Spain':
        case 'Denmark':
        case 'Norway':
        case 'Poland':
        case 'Greece':
        case 'Estonia':
            return 'Europe';
        case 'Libya':
        case 'Angola':
        case 'Liberia':
        case 'Egypt':
        case 'Nigeria':
        case 'South Africa':
        case 'Algeria':
        case 'Ghana':
        case 'Mali':
            return 'Africa';
        case 'United States of America':
        case 'Canada':
        case 'Mexico':
            return 'North America';
        case 'Brazil':
        case 'Venezuela':
        case 'Argentina':
            return 'South America';
        case 'Australia':
            return 'Australia';
        default:
            return 'Other';
    }
}
