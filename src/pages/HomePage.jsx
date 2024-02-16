import { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from 'antd';
import { Link } from "react-router-dom";

const countriesApi = "https://ih-countries-api.herokuapp.com/countries"; // countries data from API stored in a variable

function HomePage() {
  const [fetching, setFetching] = useState(true); // activate spin animation
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("useEffect - Initial render (Mounting)");
    console.log("Fetching data...");
    axios.get(countriesApi) // this will fetch the countries data from the api
      .then((response) => {
        console.log("API response data", response.data)
        setCountries(response.data); // add the list of countries to the state
        setFetching(false); // remove the spin animation
      });
  }, []); // useEffect will only be triggered once since brackets are empty

  return (
      <div className="container" style={{maxHeight: "90vh overflow scroll"}}>
      <h1 style={{fontSize: "24px"}}>WikiCountries: Your Guide to the World</h1>

      <div className="list-group">
        {fetching &&  <Spin />}

        {countries.map((country) => {
          return (
            <Link className="list-group-item list-group-item-action" key={country._id} to={country.alpha3Code.toLowerCase()}>
            <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} />
            <br />
            {country.name.common}
            </Link>
          )
        })}
      </div>
    </div>
  );
}

export default HomePage;
