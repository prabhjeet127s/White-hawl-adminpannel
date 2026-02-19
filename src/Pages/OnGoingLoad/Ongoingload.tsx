import { useQuery } from "@tanstack/react-query";
import { Getongoingload } from "../../API Service/OnGoingLoads/OnGoingLoada";
import { useState } from "react";
import { IoIosFunnel } from "react-icons/io";
import { useNavigate } from "react-router-dom";



const Ongoingload = () => {
    const navigate=useNavigate();
    const [viewdoc, setviewdoc] = useState(false);
    const [selectuser, setselectuser] = useState<[]>([])

    const { data, isLoading, isError } = useQuery({
        queryKey: ["loads"],
        queryFn: () => Getongoingload(0, 10),
    });


    const loads = data?.data?.data?.loads || [];
    console.log(loads)

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;

    const handledocclick = (load) => {

        setselectuser(load)
        setviewdoc(!viewdoc)

    }


    return (

        <>
            <div className="flex items-center justify-between w-full p-6 bg-gray-100">
                <div className="flex items-center gap-4">

                    <input
                        type="text"
                        placeholder="Search"
                        className="w-96 px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400" />

                    <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition duration-200">
                        <IoIosFunnel size={20} />

                    </button>
                </div>

                <button onClick={()=>navigate('/add-loads')} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold text-lg shadow-md transition duration-200">
                    + Create Loads
                </button>
            </div>

{/**down seaction */}
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-gray-500 border-none">
                            <tr>
                                <th className="p-4 text-left">Load No</th>
                                <th className="p-4 text-left">Assign Driver</th>
                                <th className="p-4 text-left">Assigned Driver</th>
                                <th className="p-4 text-left">Pickup Location</th>
                                <th className="p-4 text-left">Pickup Date & Time</th>
                                <th className="p-4 text-left">Drop Location</th>
                                <th className="p-4 text-left">Drop Date & Time</th>
                                <th className="p-4 text-left">Load Type</th>
                                <th className="p-4 text-left">Trailer</th>
                                <th className="p-4 text-left">Load Status</th>
                                <th className="p-4 text-left">Document</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loads.map((load) => (
                                <tr key={load.loadId} className="border-none hover:bg-gray-50">
                                    {/* Load No + View Details */}
                                    <td className="p-4">
                                        <div className="font-semibold">{load.loadNo}</div>
                                        <div className="text-red-500 text-sm cursor-pointer">
                                            View Details
                                        </div>
                                    </td>

                                    {/* Assign Driver Button */}
                                    <td className="p-4">
                                        <button className="border border-red-500 text-red-500 px-4 py-1 rounded-lg hover:bg-red-50">
                                            Assign Driver
                                        </button>
                                    </td>

                                    {/* Assigned Driver */}
                                    <td className="p-4">
                                        {load.assignedDriverName || "--"}
                                    </td>

                                    {/* Pickup Location */}
                                    <td className="p-4">
                                        {load.pickupLocation || "--"}
                                    </td>

                                    {/* Pickup Date */}
                                    <td className="p-4">
                                        {load.pickupDateTime || "--"}
                                    </td>

                                    {/* Drop Location */}
                                    <td className="p-4">
                                        {load.dropLocation || "--"}
                                    </td>

                                    {/* Drop Date */}
                                    <td className="p-4">
                                        {load.dropDateTime || "--"}
                                    </td>

                                    {/* Load Type */}
                                    <td className="p-4">{load.loadType}</td>

                                    {/* Trailer */}
                                    <td className="p-4">
                                        {load.assignedVehicleUniqueId || "--"}
                                    </td>

                                    {/* Status */}
                                    <td className="p-4 capitalize">
                                        {load.status}
                                    </td>

                                    {/* Documents */}
                                    <td className="p-4 text-blue-600 underline cursor-pointer">
                                        <button onClick={() => handledocclick(load.documentArray)} >
                                            view document
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {viewdoc && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-3 relative">

                    <h3 className="font-semibold p-3 text-3xl " >Documents</h3>
                    <div>
                        <ul className=" max-h-60 overflow-y-auto">

                            {selectuser?.map((doc, i) => (

                                <li className="p-1.5 text-blue-500 text-xl hover:underline mx-3.5 m-2">
                                    <a key={i}
                                        target="_blank"
                                        href={doc.mediaUrl}  >
                                        Document {i + 1} </a>
                                </li>
                            ))}

                        </ul>
                        <button
                            onClick={() => setviewdoc(!viewdoc)}
                            className="bg-gray-200 hover:bg-gray-300  ml-5 p-3 px-5 mb-3 font-semibold rounded-lg "  >Close</button>

                    </div>
                </div>
            </div>)
            }
        </>



    );
};

export default Ongoingload;
