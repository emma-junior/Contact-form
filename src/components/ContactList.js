import React from 'react'

const ContactList = ({formItems, setFormItems}) => {

  const removeItem = (id) => {
    let newFormArray = formItems.filter((array) => array.id !== id);
    setFormItems(newFormArray);
  };

  return (
    <div>
      <div className="flex mt-3 font-semibold">
        <p className="lg:mr-40 mr-28">Email</p>
        <p className="lg:mr-32">Country</p>
        <p>State</p>
      </div>
      {formItems.map((formItem) => {
        const { id, email, selectedCountry, selectedState } = formItem;
        return (
          <div className="flex mt-1" key={id}>
            <p className="w-48">{email}</p>
            <div className="flex">
              <img
                className="h-5 w-7 mx-2"
                src={selectedCountry.flag}
                alt="flag"
              />
              <p className="w-36">{selectedCountry.name}</p>
            </div>
            <p className="w-36"> {selectedState}</p>
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
  );
}

export default ContactList