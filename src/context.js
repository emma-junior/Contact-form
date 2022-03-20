import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [modal, setModal] = useState(false)
  const [formItems, setFormItems] = useState(() => {
    const localData = localStorage.getItem("formItems");
    return localData ? JSON.parse(localData) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("formItems", JSON.stringify(formItems));
  }, [formItems]);
  return (
    <AppContext.Provider value={{ formItems, setFormItems, modal, setModal }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
