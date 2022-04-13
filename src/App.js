import { useState } from "react";
import Header from "./components/header";
import Country from "./components/Country";
import Email from "./components/email";
import State from "./components/State";
import ContactList from "./components/ContactList";
import Modal from "./components/modal"
import ellipsefour from "./images/afiari test/Ellipse 4.svg"
import ellipsefive from "./images/afiari test/Ellipse 5.svg"
import ellipsesix from "./images/afiari test/Ellipse 6.svg"
import ellipseEight from "./images/afiari test/Ellipse 8.svg"
import ellipseThree from "./images/afiari test/Ellipse 3.svg"
import { useGlobalContext } from "./context";

// const state_url = "https://countriesnow.space/api/v0.1/countries/states"

function App() {
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const {modal, setModal } = useGlobalContext();
  const { formItems, setFormItems } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && selectedCountry?.name && selectedState) {
      const newFormItem = {
        email,
        selectedCountry,
        selectedState,
        id: new Date().getTime().toString(),
      };
      setFormItems([...formItems, newFormItem]);
      setEmail("");
      setSelectedCountry("");
      setSelectedState("");
      setModal(false);
    } else {
      setModal(true);
    }
  };
  console.log(formItems)

  return (
    <div>
      <div className="relative">
        <Modal />
      </div>
     <div className="bg-[#F6FAF9] top-0 h-screen absolute w-full"> 
      <div className="lg:flex lg:m-10 lg:ml-40 overflow-hidden">
        <div className="p-4 lg:p-7 bg-white lg:w-1/3 w-80 lg:ml-2 ml-5 mt-10 rounded-md md:ml-60  z-20">
          <Header />

          {/* email */}
          <Email email={email} setEmail={setEmail} />

          {/* country */}
          <Country
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />

          {/* state */}
          <State
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="bg-[#84A79E] text-white lg:w-72 w-72 py-3 mt-28 rounded-md "
          >
            Submit
          </button>
        </div>

        {/* decorations */}
        <img
          className="absolute lg:left-32 lg:top-60 z-10 hidden lg:block"
          src={ellipsefour}
          alt="ellipsefour"
        />
        <img
          className="absolute lg:left-28 lg:bottom-52 z-10 hidden lg:block"
          src={ellipsefive}
          alt="ellipsefive"
        />
        <img
          className="absolute lg:left-24 lg:bottom-36  z-10 hidden lg:block"
          src={ellipsesix}
          alt="ellipsesix"
        />
        <img
          className="absolute lg:left-28 lg:bottom-0 z-10 hidden lg:block w-56"
          src={ellipseEight}
          alt="ellipseEight"
        />
        <img
          className="absolute lg:right-2 lg:top-20 -z-10 hidden lg:block"
          src={ellipseThree}
          alt="ellipseThree"
        />

        {/* contact List */}
        <div className="p-7 bg-white lg:w-2/3 w-80 lg:ml-12 ml-5 mt-10 rounded-md md:ml-60">
          <h2 className="text-center font-bold mb-3">Contact list</h2>
          <hr />
          <ContactList formItems={formItems} setFormItems={setFormItems} />
        </div>
      </div>
     </div>
    </div>
  );
}

export default App;
