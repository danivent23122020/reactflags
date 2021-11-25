import React from "react";
const Card = (props) => {
    /**
     * destructuring
     * const { country } = props; == const country = props.country
     */
    const { country } = props;

    /**
     * fonction pour la
     * mise en place d'une regex pour la
     * séparartion des mille pour la population
     */
    const numberFormat = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
    return (
        <li className="card">
            <img src={country.flag} alt="drapeau" />
            <div className="data-container">
                <ul>
                    <li>{country.name}</li>
                    <li>{country.capital}</li>
                    <li>Pop. {numberFormat(country.population)}</li>
                    <li>{country.region}</li>
                </ul>
            </div>
        </li>
    );
};

export default Card;
