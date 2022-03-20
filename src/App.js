import { useEffect, useState } from "react";
import {BiCaretDown} from "react-icons/bi"
import Modal from "./modal";
import { useGlobalContext } from "./context";

const country_url = "https://countriesnow.space/api/v0.1/countries/flag/images";
const state_url = "https://countriesnow.space/api/v0.1/countries/states"

function App() {
  const { modal, setModal } = useGlobalContext();
  const [email, setEmail] = useState("")

  const [countriesDropdown, setCountriesDropdown] = useState(false)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [flag, setFlag] = useState("")

  const [statesDropdown, setStatesDropdown] = useState(false);
  const [states, setStates] = useState([])
  const [selectedStates, setSelectedStates] = useState('')

  const { formItems, setFormItems } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && selectedCountry) {
      const newFormItem = {
        email,
        selectedCountry,
        id: new Date().getTime().toString(),
      };
      setFormItems([...formItems, newFormItem]);
      setEmail("");
      setSelectedCountry('')
    } else {
      setModal(true)
    }
  };
  console.log(formItems)
  const getCountries = async() => {
    const response = await fetch(country_url)
    const countries = await response.json()

    setCountries(countries.data)
  }
  
  // console.log(countries)
  useEffect(() => {
    getCountries()
  },[])

  // const getStates = async () => {
  //   const response = await fetch(state_url);
  //   const states = await response.json();

  //   setStates(states);
  // };

  // useEffect(() => {
  //   getStates()
  // },[selectedCountry])
  // console.log(states);
  // console.log(selectedCountry)

  // const handlecountry = (e) => {
  //   const filteredStates = states.data.filter(state => state.name === e.target.value)
  //   setStates(filteredStates)
  // }
  
  const removeItem = (id) => {
    let newFormArray = formItems.filter((array) => array.id !== id);
    setFormItems(newFormArray);
  };
  return (
    <>
    { modal && <Modal />}
    <div className="lg:flex lg:m-10 lg:ml-44 overflow-hidden">
      <div className="p-4 lg:p-7 bg-white lg:w-1/3 w-80  ml-5 mt-10 rounded md">
        <div className="text-center">
          <h2 className="font-bold">Let's Know you more</h2>
          <p className="p-3">Fill the appropriate details</p>
        </div>
        {/* email */}
        <div>
          <input
            className="border-solid border-2 border-[#888] rounded-md lg:w-72 w-72 p-1 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        {/* country */}
        <div className="border-solid border-2 border-[#888] rounded-md p-1 lg:w-72 w-72">
          <div
            className="flex ml-2"
            onClick={() => setCountriesDropdown(!countriesDropdown)}
          >
            <h3 className="text-sm">Country</h3>
            <span className="lg:ml-44 ml-44 my-[auto]">
              <BiCaretDown />
            </span>
          </div>
          {flag && <img className="h-5 w-7 ml-2" src={flag} alt="flag" />}
        </div>
        <div className="h-40 lg:-my-6 overflow-x-hidden lg:ml-44 ml-28 z-10 lg:w-40 w-36">
          {countriesDropdown &&
            countries.map((country) => {
              // console.log(country)
              const { name, flag } = country;
              return (
                <div
                  id="country-dropdown"
                  className=" bg-slate-50 p-1 shadow-lg shadow-black-500/50 lg:w-52"
                >
                  <div
                    className="flex hover:bg-white"
                    value={countries}
                    onClick={(e) => {
                      // handlecountry(e);
                      setSelectedCountry(name);
                      setFlag(flag);
                      setCountriesDropdown(false);
                    }}
                  >
                    <img className="h-5 w-7 mx-3" src={flag} alt="flag" />
                    <h2 className="lg:sm">{name}</h2>
                  </div>
                </div>
              );
            })}
        </div>
        {/* state */}
        {/* <div className="border-solid border-2 border-[#888] rounded-md p-1 w-96 absolute bottom-80 mt-5">
          <div
            className="flex ml-2"
            // onClick={() => setCountriesDropdown(!countriesDropdown)}
          >
            <h3 className="text-sm">state</h3>
            <span className="ml-72 my-[auto]">
              <BiCaretDown />
            </span>
          </div>
        </div> */}

        {/* {statesDropdown && states.map((state) => {

        })} */}
        <button
          className="bg-cyan-500 text-white lg:w-72 w-72 py-3 mt-10 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div className="p-7 bg-white lg:w-1/3 w-80 ml-5 mt-10 rounded md">
        <h2 className="text-center font-bold mb-3">Contact list</h2>
        <hr />
        <div className="flex mt-3 font-semibold">
          <p className="lg:mr-32 mr-28">Email</p>
          <p>Country</p>
        </div>
        {formItems.map((formItem) => {
          const { id, email, selectedCountry } = formItem;
          return (
            <div className="flex" key={id}>
              <p className="w-44">{email}</p>
              <p className="w-32">{selectedCountry}</p>
              <button
                className="font-bold text-black text-[#888]"
                onClick={() => removeItem(id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default App;
