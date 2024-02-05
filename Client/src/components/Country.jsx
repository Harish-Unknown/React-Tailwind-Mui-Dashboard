import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryChart from "./CountryChart"; 

export default function Country() {
    const [shows, setShows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = "http://localhost:5000/getdata";

        axios.get(apiUrl)
            .then(response => {
                setShows(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredShows = shows.filter(show => show.country !== '');

    const countryCounts = filteredShows.reduce((counts, show) => {
        console.log(show.country);
        counts[show.country] = (counts[show.country] || 0) + 1;
        return counts;
    }, {});

    const countryData = Object.entries(countryCounts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count) 
        .slice(0, 10); 


    return (
        <div>
            <h2 className="text-gray-400">Country vs Counts </h2>
            <CountryChart countryData={countryData} /> 
        </div>
    );
}
