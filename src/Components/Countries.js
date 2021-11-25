import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
    /**
     * déclaration du state pour le tableau des flags
     */
    const [data, setData] = useState([]);

    /**
     * triage des pays par population
     */
    const [sortedData, setSortedData] = useState([]);
    /**
     * useEffect avec axios pour éviter les requêtes sans fin
     */
    useEffect(() => {
        axios
            .get(
                "https://restcountries.com/v2/all?fields=name,population,region,capital,flag"
            )
            .then((result) => setData(result.data));
    }, []);
    return (
        <div className="countries">
            <h1>Countries </h1>
            <ul className="countries-list">
                {data.map((country) => (
                    <Card country={country} key={country.name} />
                ))}
            </ul>
        </div>
    );
};

export default Countries;
