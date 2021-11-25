import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
    // useState déclaration du state pour le tableau des flags
    const [data, setData] = useState([]);

    // useState triage des pays par population
    const [sortedData, setSortedData] = useState([]);

    // useState pour éviter boucle infinie
    const [playOnce, setPlayOnce] = useState(true);

    // useState pour le réglage de l'affichage du nb de flags
    const [rangeValue, setRangeValue] = useState(40);

    // useState pour la sélection du bouton radio
    const [selectedRadio, setSelectedRadio] = useState("");

    // tableau des labels des boutons radio
    const radios = ["Europe", "America", "Africa", "Asia", "Océania"];

    /**
     * useEffect pour éviter les requêtes sans fin
     * axio pour le get
     * on set setPlayOnce à false pour éviter encore une boucle infinie
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
            sortedArray.length = rangeValue;
            setSortedData(sortedArray);
        };
        sortedCountry();
        // callback data pour rejouer le useEffect
    }, [data, rangeValue, playOnce]);
    return (
        <div className="countries">
            <h1>Countries </h1>
            <div className="sort-container">
                <input
                    type="range"
                    min="1"
                    max="250"
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                />
                <ul>
                    {radios.map((radio) => {
                        return (
                            <li key={radio}>
                                <input
                                    type="radio"
                                    value={radio}
                                    id={radio}
                                    checked={radio === selectedRadio}
                                    onChange={(e) =>
                                        setSelectedRadio(e.target.value)
                                    }
                                />
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="cancel">
                {selectedRadio && (
                    <h5 onClick={() => setSelectedRadio("")}>
                        Annuler recherche
                    </h5>
                )}
            </div>
            <ul className="countries-list">
                {sortedData
                    .filter((country) => country.region.includes(selectedRadio))
                    .map((country) => (
                        <Card country={country} key={country.name} />
                    ))}
            </ul>
        </div>
    );
};

export default Countries;
