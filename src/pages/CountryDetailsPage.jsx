import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function CountryDetails() {
  const [foundCountry, setFoundCountry] = useState(null);

  const { countryId } = useParams();
  console.log('The countryId is:', countryId);

  useEffect(() => {
    console.log("useEffect - Initial render (Mounting)");
    console.log("Fetching data...");
    axios.get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        console.log("API response data", response.data)
        setFoundCountry(response.data); // add country's details to the state
      });
  }, [countryId]); // useEffect will run after the initial render and each time that the URL parameter with the countryId changes.

  if (foundCountry === null || undefined) {
    console.log("State variable is currently null or undefined. Data is still loading.")
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  else {
    return(
        <div className="container">
        <p style={{fontSize: "24px", fontWeight: "bold"}}>Country Details</p>

        <img src={`https://flagpedia.net/data/flags/icon/72x54/${foundCountry.alpha2Code.toLowerCase()}.png`} />
        <br/>
        <h1>{foundCountry.name.common}</h1>

        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{width: "30%"}}>Capital</td>
              <td>{foundCountry.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
              {foundCountry.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul style={{listStyle: "none"}}>
                  {foundCountry.borders.map((borderCountryAlpha3Code) => {
                    return (
                      <li key={borderCountryAlpha3Code}><Link to={`/${borderCountryAlpha3Code}`}>{borderCountryAlpha3Code}</Link></li>
                    )
                  })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CountryDetails;
