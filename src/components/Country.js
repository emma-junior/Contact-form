import React, { useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";

const country_url = "https://countriesnow.space/api/v0.1/countries/flag/images";

const Country = ({ selectedCountry, setSelectedCountry }) => {
  const [countriesDropdown, setCountriesDropdown] = useState(false);
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    const response = await fetch(country_url);
    const countries = await response.json();
    
    const showedCountries = countries.data.filter(shownCountries => shownCountries.name !== "Afghanistan")
    setCountries(showedCountries);
  };

  console.log(countries);
  useEffect(() => {
    getCountries();
  }, [countries.length]);

  // const handlecountry = (e) => {
  //   const filteredStates = states.data.filter(state => state.name === e.target.value)
  //   setStates(filteredStates)
  // }

  return (
    <div className="relative z-20">
      <div className="border-solid border-2 border-[#888] rounded-md p-1 lg:w-72 w-72">
        <div
          className="flex ml-2 "
          onClick={() => setCountriesDropdown(!countriesDropdown)}
        >
          <div className="w-10/12">
            {!selectedCountry?.flag && <h3 className="text-sm">Country</h3>}
            {selectedCountry?.flag && (
              <div className="flex mt-1">
                <img
                  className="h-5 w-7 mx-2"
                  src={selectedCountry.flag}
                  alt="flag"
                />
                <h2>{selectedCountry.name}</h2>
              </div>
            )}
          </div>
          <span className="my-[auto] w-2/12">
            <BiCaretDown />
          </span>
        </div>
      </div>
      <div className={`h-40 lg:-my-6 -my-3 overflow-x-scroll lg:ml-28 ml-28 lg:w-40 w-36 absolute scroll-bar ${countriesDropdown ? 'block' : 'hidden' }`}>
        {
          countries.map((country) => (
            <div
              className=" bg-white p-1 shadow-lg shadow-black-500/50 lg:w-52"
              key={country.iso3}
            >
              <div
                className="flex hover:bg-white"
                value={selectedCountry}
                onClick={(e) => {
                  // handlecountry(e);
                  setSelectedCountry(country);
                  setCountriesDropdown(false);
                }}
              >
                <img className="h-5 w-7 mx-3" src={country.flag} alt="flag" />
                <h2 className="lg:sm">{country.name}</h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Country;
