import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PestFactorsDistributionChart from './PestFactorsDistributionChart';

const PestFactorsDistribution = () => {
    const [error, setError] = useState(null);
    const [pestFactorData, setPestFactorData] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/getdata'; 

        axios.get(apiUrl)
            .then(response => {
                setPestFactorData(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2 className='text-gray-400 mb-3'>Pest Factors Distribution</h2>
            <PestFactorsDistributionChart pestFactorData={pestFactorData} />
        </div>
    );
}

export default PestFactorsDistribution;
