import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { getTrailerList } from '../../API Service/Trailer/Trailer';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CreateOnGoingLoads } from '../../API Service/OnGoingLoads/OnGoingLoada';



const Addloads = () => {

  const navigate = useNavigate();

  const [pickuploc, setpickuploc] = useState<string>("")
  const [pickupdate, setpickupdate] = useState<string>("")
  const [pickuptime, setpickuptime] = useState<number | null>(null);
  const [pickupcontact, setpickupcontact] = useState<string>("")
  const [pickuplon, setpickuplon] = useState<number>()
  const [pickuplat, setpickuplat] = useState<number>()

  const [droploc, setdroploc] = useState<string>("")
  const [dropdate, setdropdate] = useState<string>("")
  const [droptime, setdroptime] = useState<number | null>(null);
  const [dropcontact, setdropcontact] = useState<string>("")
  const [droplon, setdroplon] = useState<number>()
  const [droplat, setdroplat] = useState<number>()

  const [loadname, setloadname] = useState<string>("")
  const [loadtype, setloadtype] = useState<string>("")
  const [weight, setweight] = useState<number>()
  const [description, setdescription] = useState<string>("")

  const [licenseplateno, setlicenseplateno] = useState<string>("")
  const [loaddescription, setloaddescription] = useState<string>("")

  const [docname, setdocname] = useState<string>("")
  const [docdescription, setdocdescription] = useState<string>("")
  const [doctype, setdoctype] = useState<string>("")

  const vehicleType = "trailer"
  const { data } = useQuery({
    queryKey: ['list', vehicleType],
    queryFn: () => getTrailerList(0, 10, undefined, vehicleType)
  })

  const vehicles = data?.data?.data?.vehicles || [];

  console.log(data)

  
  const handleback = () => {
    navigate('/ongoing-loads')
  }

  const payload = {
    loadName: loadname,
    loadType: loadtype,
    weight: 1500,
    documentArray: [
      {
        docType: doctype,
        name: docname,
        mediaUrl: "https://example.com/documents/invoice123.pdf",
        sortNumber: 0
      },

    ],
    pickupDetails: [
      {
        pickupNumber: 1,
        location: {
          "type": "Point",
          "coordinates": [
            pickuplat,
            pickuplon
          ]
        },
        pickupAddress: pickuploc,
        pickupTimestamp: pickuptime,
        mobile: pickupcontact
      },

    ],
    dropDetails: [
      {
        dropNumber: 1,
        location: {
          "type": "Point",
          "coordinates": [
            pickuplat,
            pickuplon
          ]
        },
        "dropAddress": droploc,
        dropTimestamp: droptime,
        mobile: dropcontact
      },

    ]
  }

  const handleonclick = async (e) => {
    alert('clicked ')

    e.preventDefault();   // ✅ FIXED

    const response = await CreateOnGoingLoads(payload)
    navigate('/ongoing-loads')

  }



  return (


    <div className=" min-h-screen flex justify-center items-start  border border-gray-500 rounded-lg  h-[400px]">

      <div className=' shadow-2xl bg-white  mt-4   min-w-5xl  h-[590px]' >
        <h3 onClick={handleback} className=' text-xl  mt-5 mx-14 flex gap-1 ' >  <FaLongArrowAltLeft className='pt-2 text-2xl  ' />
          Back</h3>

        <form action="" onSubmit={handleonclick}  >
          <div className='border-2 border-gray-200 mb-3  m-10 mt-7  overflow-y-auto h-[410px] overflow-hidden  p-6' >
            <h3 className='text-2xl font-semibold pb-6 '>Load #</h3>
            <h3 className='mb-5'>Pickup Details
            </h3>


            {/**pickup details */}
            <div className="w-ful p-3 rounded-lg">
              <h2 className=" font-semibold mb-4">Pick #1</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">


                <input
                  onChange={(e) => setpickuploc(e.target.value)}
                  value={pickuploc}
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


                <input
                  onChange={(e) => setpickupdate(e.target.value)}
                  value={pickupdate}
                  type="date"
                  placeholder="dd-mm-yyyy"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  type="time"
                  value={
                    pickuptime
                      ? new Date(pickuptime).toTimeString().slice(0, 5)
                      : ""
                  }
                  onChange={(e) => {
                    const timeValue = e.target.value;
                    const today = new Date();

                    const [hours, minutes] = timeValue.split(":").map(Number);

                    today.setHours(hours);
                    today.setMinutes(minutes);
                    today.setSeconds(0);

                    setpickuptime(today.getTime());
                  }}
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2"
                />


              </div>

              <div className="grid grid-cols-3 gap-4">
                <input
                  onChange={(e) => setpickupcontact(e.target.value)}
                  value={pickupcontact}
                  type="text"
                  placeholder="Contact"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  onChange={(e) => setpickuplat(e.target.value)}
                  value={pickuplat}
                  type="number"
                  defaultValue="0"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  onChange={(e) => setpickuplon(e.target.value)}
                  value={pickuplon}
                  type="number"
                  defaultValue="0"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>


            {/**Drops  details */}
            <div className="w-ful p-3 rounded-lg">
              <h2 className=" font-semibold mb-4">Drop #1</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">


                <input
                  value={droploc}
                  onChange={(e) => setdroploc(e.target.value)}
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


                <input
                  onChange={(e) => setdropdate(e.target.value)}
                  value={dropdate}
                  type="date"
                  placeholder="dd-mm-yyyy"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  type="time"
                  value={
                    droptime
                      ? new Date(droptime).toTimeString().slice(0, 5)
                      : ""
                  }
                  onChange={(e) => {
                    const timeValue = e.target.value;

                    const today = new Date();
                    const [hours, minutes] = timeValue.split(":").map(Number);

                    today.setHours(hours);
                    today.setMinutes(minutes);
                    today.setSeconds(0);

                    setdroptime(today.getTime()); // ✅ number
                  }}
                  placeholder="--:--"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


              </div>

              <div className="grid grid-cols-3 gap-4">
                <input
                  onChange={(e) => setdropcontact(e.target.value)}
                  value={dropcontact}
                  type="text"
                  placeholder="Contact"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  onChange={(e) => setdroplat(e.target.value)}
                  value={droplat}
                  type="number"
                  defaultValue="0"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  onChange={(e) => setdroplon(e.target.value)}
                  value={droplon}
                  type="number"
                  defaultValue="0"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/**Load name  */}
            <div className="w-ful p-3 rounded-lg">
              <h2 className=" font-semibold mb-4">Load</h2>

              <div className="grid grid-cols-3 gap-4 mb-4">


                <input
                  onChange={(e) => setloadname(e.target.value)}
                  type="text"
                  value={loadname}
                  placeholder="Load Name"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


                <input
                  onChange={(e) => setloadtype(e.target.value)}
                  value={loadtype}
                  type="text"
                  placeholder="Load type"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  onChange={(e) => setweight(e.target.value)}
                  value={weight}
                  type="text"
                  placeholder="Weight"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                  type="text"
                  placeholder="Description"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


              </div>







            </div>


            {/*Trailer*/}
            <div className="w-ful p-3 rounded-lg">

              <h2 className=" font-semibold mb-4">Trailer</h2>

              <div className="grid grid-cols-3 gap-4 mb-4">

                <select
                  onChange={(e) => setlicenseplateno(e.target.value)}
                  value={licenseplateno}

                  className='w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  name="" id="">
                  <option value="Select trailer">Select trailer</option>
                  {vehicles?.map((item) => (
                    <option value={item?.licensePlateNo}>{item.licensePlateNo}
                    </option>
                  ))}
                </select>

                <input
                  onChange={(e) => setloaddescription(e.target.value)}
                  value={loaddescription}
                  type="text"
                  placeholder="Load Instructions"
                  className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


              </div>

            </div>

            {/**doucmunets */}
            <div className="w-full p-3 rounded-lg">
              <h2 className=" font-semibold mb-4">Upload Document</h2>

              <div className="flex gap-4 mb-4">

                <select
                  className=" w-50  border border-gray-300 bg-white rounded-md px-2 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"

                  value={doctype} onChange={(e) => setdoctype(e.target.value)} name="" id="">
                  <option value="">Select Document</option>
                  <option value="gatePass">gatePass</option>
                  <option value="billOfLading">billOfLading</option>
                  <option value="pickupManifest">pickupManifest</option>
                  <option value="proofOfDelivery">proofOfDelivery</option>
                  <option value="deliverReceipt">deliverReceipt</option>

                </select>

                <input
                  onChange={(e) => setdocname(e.target.value)}
                  value={docname}
                  type="text"
                  placeholder="Document Name"
                  className=" w-50  border border-gray-300 bg-white rounded-md px-2 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  onChange={(e) => setdocdescription(e.target.value)}
                  value={docdescription}
                  type="text"
                  placeholder="Document Description"
                  className=" w-50 border border-gray-300 bg-white rounded-md px-2 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  onChange={(e) => setdescription(e.target.value)}
                  type="file"
                  placeholder=""
                  className=" w-50  border border-gray-300 bg-white rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


              </div>

            </div>



          </div>
          <button className=' mx-7 mt-5 border rounded-xl mb-7 text-white  shadow-2xl bg-red-500 px-4 p-2 text-lg' >submit</button>

        </form>


      </div>

    </div>





  )
}

export default Addloads
