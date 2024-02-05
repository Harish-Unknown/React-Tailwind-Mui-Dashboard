import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikelihoodChart from './LikelihoodChart';

const Likelihood = () => {
    const [likelihoodData, setLikelihoodData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getdata');
                setLikelihoodData(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2 className='text-gray-400'>Likelihood Over Time</h2>
            <LikelihoodChart likelihoodData={likelihoodData} />
        </div>
    );
};

export default Likelihood;
