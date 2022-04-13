import React from 'react'
import App from './App'
import Modal from "./components/modal";
import { useGlobalContext } from "./context";

const FullContent = () => {
    const { modal } = useGlobalContext();
  return (
    <div>
      {modal ? (
        <div className="">
            <div className='bg-[#000] h-screen opacity-50 relative z-30'></div>
          <div className="absolute top-0 w-full">
            <App />
          </div>
          <div className="absolute lg:left-1/3 top-24  z-40">
            <Modal />
          </div>
        </div>
      ) : (
        <div>
          <App />
        </div>
      )}
    </div>
  );
}

export default FullContent