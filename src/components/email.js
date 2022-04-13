import React from 'react'

const Email = ({email, setEmail}) => {
    
  return (
    <div className=''>
      <div email={email} >
        <input
          className="border-solid border-2 border-[#888] rounded-md lg:w-72 w-72 p-1 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
    </div>
  );
}

export default Email