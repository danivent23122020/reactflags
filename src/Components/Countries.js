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
     * éviter boucle infinie
     */
    const [playOnce, setPlayOnce] = useState(true);

    /**
     * useEffect avec axios pour éviter les requêtes sans fin
     */
    useEffect(() => {
        if (playOnce) {
            axios
                .get(
                    "https://restcountries.com/v2/all?fields=name,population,region,capital,flag"
                )
                .then((result) => {
                    setData(result.data);
                    setPlayOnce(false);
                });
        }

        // fonction triage des pays
        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            const sortedArray = countryObj.sort((a, b) => {
                return b.population - a.population;
            });
            // on limite le nombre de flags sur la page
            sortedArray.length = 30;
            setSortedData(sortedArray);
        };
        sortedCountry();
        // callback data pour rejouer le useEffect
    }, [data]);
    return (
        <div className="countries">
            <h1>Countries </h1>
            <ul className="countries-list">
                {sortedData.map((country) => (
                    <Card country={country} key={country.name} />
                ))}
            </ul>
        </div>
    );
};

export default Countries;
