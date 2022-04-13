import React, { useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";

const state_url = "https://countriesnow.space/api/v0.1/countries/states";

const State = ({ selectedCountry, selectedState, setSelectedState }) => {

  const [states, setStates] = useState([]);
  const [statesDropdown, setStatesDropdown] = useState(false);

  const getStates = async () => {
    const response = await fetch(state_url);
    const countryResponse = await response.json();
    console.log("countryResponse", countryResponse);
    const filteredCountry = countryResponse.data.filter(
      (country) => country.iso3 === selectedCountry.iso3
    );
    console.log("filteredCountry", filteredCountry);
    if (filteredCountry.length === 0) {
      console.error(`Could not find states of ${selectedCountry?.name}`);
      return;
    }
    setStates(filteredCountry[0].states);
    console.log("states", states);
  };

  useEffect(() => {
      if (selectedCountry) {
        getStates();
      }
    
    console.log(selectedCountry?.iso3, "selectedCountry");
  }, [selectedCountry]);

  return (
    <div className="mt-5 relative z-10">
      <div className="border-solid border-2 border-[#888] rounded-md p-1 lg:w-72 w-72">
        <div
          onClick={() => setStatesDropdown(!statesDropdown)}
          className="flex ml-2"
        >
          <div className="w-10/12">
            {!selectedState && <h3 className="text-sm">State</h3>}
            {selectedState && <h3 className="text-sm ">{selectedState}</h3>}
          </div>
          <span className="w-2/12 my-[auto] ">
            <BiCaretDown />
          </span>
        </div>
      </div>
      <div
        className={`absolute h-40 overflow-y-auto overflow-x-scroll lg:w-40 lg:-my-6 -my-3 lg:ml-28 scroll-bar ${
          statesDropdown ? "block" : "hidden"
        }`}
      >
        {states.map((state) => {
          console.log(state.name);
          return (
            <div
              className=" bg-white p-1 shadow-lg shadow-black-500/50 lg:w-52"
              key={state.state_code}
            >
              <h3
                className=""
                onClick={() => {
                  setSelectedState(state.name);
                  setStatesDropdown(false);
                }}
              >
                {state.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default State;
