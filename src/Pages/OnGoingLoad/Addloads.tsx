import React, { useState } from 'react'
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";


const Addloads = () => {

  const [pickuploc, setpickuploc] = useState("")
  const [pickupdate, setpickupdate] = useState("")
  const [pickuptime, setpickuptime] = useState("")
  const [pickupcontact, setpickupcontact] = useState("")
  const [pickuplon, setpickuplon] = useState("")
  const [pickuplat, setpickuplat] = useState("")

  const  handleform=()=>{

    console.log(pickuptime)

  }

  return (


    <div className="  g-gray-100 min-h-screen flex justify-center items-start p-10 border border-gray-300 rounded-lg p-6 my-6 bg-white overflow-y-auto h-[400px]">

      <div className='border  m-3  p-4 overflow-y-auto h-[400px]' >
        <h3 className='text-2xl font-semibold '>Loads</h3>
        <h3>Pickup Details
        </h3>

        <form action="" onSubmit={handleform}  >

        {/**pickup details */}
        <div className="w-ful p-6 rounded-lg">
          <h2 className="text-blue-600 font-semibold mb-4">Pick #1</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">

            {/**pickuplocation */}
            <input
            onChange={(e)=>setpickuploc(e.target.value)}
              type="text"
              placeholder="Enter pickup location"
              className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />


            <input
            onChange={(e)=>setpickupdate(e.target.value)}
              type="date"
              placeholder="dd-mm-yyyy"
              className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
            onChange={(e)=>setpickuptime(e.target.value)}
              type="time"
              placeholder="--:--"
              className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />


          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
            onChange={(e)=>setpickupcontact(e.target.value)}
              type="text"
              placeholder="Contact"
              className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
            onChange={(e)=>setpickuplat(e.target.value)}
              type="number"
              defaultValue="0"
              className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
            onChange={(e)=>setpickuplon(e.target.value)}
              type="number"
              defaultValue="0"
              className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <button>sumbit</button>

        </form>
      </div>

    </div>





  )
}

export default Addloads
