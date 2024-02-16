import { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from 'antd';

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
          {/* <a className="list-group-item list-group-item-action" href="/ABW"> 🇦🇼 Aruba </a>
          <a className="list-group-item list-group-item-action" href="/AFG"> 🇦🇫 Afghanistan </a>
          <a className="list-group-item list-group-item-action" href="/AGO"> 🇦🇴 Angola </a>
          <a className="list-group-item list-group-item-action" href="/AIA"> 🇦🇮 Anguilla </a>
          <a className="list-group-item list-group-item-action" href="/ALA"> 🇦🇽 Åland Islands </a>
          <a className="list-group-item list-group-item-action" href="/ALB"> 🇦🇱 Albania </a>
          <a className="list-group-item list-group-item-action" href="/AND"> 🇦🇩 Andorra </a>
          <a className="list-group-item list-group-item-action" href="/ARE"> 🇦🇪 United Arab Emirates </a>
          <a className="list-group-item list-group-item-action" href="/ARG"> 🇦🇷 Argentina </a>
          <a className="list-group-item list-group-item-action" href="/ARM"> 🇦🇲 Armenia </a>
          <a className="list-group-item list-group-item-action" href="/ASM"> 🇦🇸 American Samoa </a>
          <a className="list-group-item list-group-item-action" href="/ATA"> 🇦🇶 Antarctica </a>
          <a className="list-group-item list-group-item-action" href="/FLK"> 🇫🇰 Falkland Islands </a>
          <a className="list-group-item list-group-item-action active" href="/FRA"> 🇫🇷 France </a>
          <a className="list-group-item list-group-item-action" href="/ZWE"> 🇿🇼 Zimbabwe </a> */}
          {fetching &&  <Spin />}

          {countries.map((country) => {
        return (
          <p className="list-group-item list-group-item-action" key={country._id}>{country.name.common}</p>
        )
      })}
        </div>
      </div>
    );
}

export default HomePage;
