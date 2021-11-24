import axios from "axios";
import React, { useEffect, useState } from "react";

const Countries = () => {
    /**
     * déclaration du state pour le tableau des flags
     */
    const [data, setData] = useState([]);
    /**
     * useEffect pour axios et éviter les requêtes sans fin
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
                    <li> {country.name} </li>
                ))}
            </ul>
        </div>
    );
};

export default Countries;
