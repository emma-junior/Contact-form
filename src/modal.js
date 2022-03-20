import React from 'react'
import { useGlobalContext } from "./context";

const Modal = () => {
    const { modal, setModal } = useGlobalContext();
  return (
    <div className="bg-slate-50 p-4 lg:p-8 shadow-lg shadow-black-500/50 lg:w-72 w-52 mx-auto mt-5 rounded-md">
        <div className='text-center'>
            <h2>Alert</h2>
            <p className='text-red-500'>Fill all fields to continue</p>
            <h2 className='cursor-pointer' onClick={() => setModal(false)}>OK</h2>
        </div>
    </div>
  );
}

export default Modal