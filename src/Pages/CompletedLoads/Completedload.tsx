import { useQuery } from '@tanstack/react-query'

import { Getongoingload } from '../../API Service/OnGoingLoads/OnGoingLoada'
import { CiFilter } from "react-icons/ci";
import { useState } from 'react';


const Completedload = () => {

    const [selectdoc, setselectdoc] = useState([])
    const [isdocopen, setisdocopen] = useState(false)

    const status = "completed";

    const { data, isLoading, isError } = useQuery({
        queryKey: ["loads", status],
        queryFn: () => Getongoingload(0, 10, status)
    })

    const loads = data?.data?.data?.loads || [];


    if (isLoading) return <p className="p-6">Loading...</p>
    if (isError) return <p className="p-6 text-red-500">Error loading loads</p>
    console.log(loads)

    const handleload = (doc:any) => {
        setselectdoc(doc)
        setisdocopen(!isdocopen)

    }

    return (
        <>

            <div className='p-3  px-10  '  >
                <h3 className='text-2xl font-semibold pb-5' >Completed Loads</h3>
                <div className='flex gap-2 ' >
                    <input  placeholder='Search'
                    className='bg-white pl-5 w-sm  rounded-2xl ' type="text" />
                    <CiFilter className='size-12 font-bold  bg-red-600 text-white p-2 rounded-lg m-1.5 mx-'  />

                </div>

            </div>
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className=" text-left">
                            <thead className="border-none text-gray-600 text-sm font-semibold">
                                <tr>
                                    <th className="p-5">Load No</th>
                                    <th className="p-5">Assigned Driver</th>
                                    <th className="p-5">Pickup Location</th>
                                    <th className="p-5">Pickup Date & Time</th>
                                    <th className="p-5">Drop Location</th>
                                    <th className="p-5">Drop Date & Time</th>
                                    <th className="p-5">Load Type</th>
                                    <th className="p-5">Trailer</th>
                                    <th className="p-5">Load Status</th>
                                    <th className="p-5">Document</th>
                                    <th className="p-5">Create On</th>
                                </tr>
                            </thead>


                            <tbody>

                                {loads.map((load:any) => {

                                    const pickupDate = load.createdAt
                                        ? new Date(load.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })
                                        : "--";

                                    const dropDate = load.dropDetails?.[0]?.deliveredAt
                                        ? new Date(load.dropDetails[0].deliveredAt * 1000)
                                            .toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })
                                        : "--";
                                    return (
                                        <tr
                                            key={load.loadId}
                                            className="border-none hover:bg-gray-50 transition"
                                        >
                                            {/* load*/}
                                            <td className="p-3 flex">
                                                <p className="font-semibold text-gray-800">
                                                    {load.loadNo}
                                                </p>
                                                <button className="text-red-500 text-sm underline">
                                                    View Details
                                                </button>
                                            </td>

                                            {/* driver */}
                                            <td className="p-5 capitalize">
                                                {load.assignedDriverName}
                                            </td>

                                            {/* pickup loc */}
                                            <td className="p-5">
                                                {load.pickupDetails?.[0]?.pickupAddress}
                                            </td>

                                            {/* pickupdate */}
                                            <td className="p-5">
                                                {pickupDate}
                                            </td>

                                            {/* drop lic */}
                                            <td className="p-5">
                                                {load.dropDetails?.[0]?.dropAddress}
                                            </td>

                                            {/* drop dte */}
                                            <td className="p-5">
                                                {dropDate}
                                            </td>

                                            {/* load type */}
                                            <td className="p-5">
                                                {load.loadType}
                                            </td>

                                            {/* trailer */}
                                            <td className="p-5">
                                                {load.assignedVehicleUniqueId}
                                            </td>

                                            {/* statu*/}
                                            <td className="p-5">
                                                <span className="capitalize">
                                                    {load.status}
                                                </span>
                                            </td>

                                            {/* doc */}
                                            <td className="p-5">
                                                <button onClick={() => handleload(load.documentArray)} className="underline text-black">
                                                    view document
                                                </button>
                                            </td>

                                            {/* create date */}
                                            <td className="p-5">
                                                {pickupDate}
                                            </td>

                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>


            {isdocopen && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-3 relative">
                    <div className='p-4'  >
                    {selectdoc.map((value:any,i)=>(
                          <a 
                          className='text-xl font-semibold '

                          href={value.mediaUrl} 
                          >
                            Document {i+1}
                          </a>

                    ))}
                    </div>
                  
                    <button  onClick={()=>setisdocopen(!isdocopen)}  className='text-left bg-gray-200  px-5 mx-4  p-2 rounded-xl     '>Close</button>
                    
                </div>
            </div>)}

        </>
    )
}

export default Completedload
