import { getTrailerList } from '../../API Service/Trailer/Trailer';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiFilter } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


const Trailerdetail = () => {

    const navigate = useNavigate()

    const [offset] = useState<number>(0);
    const limit = 10;
    const vehicleType = "trailer";

    const { data, isLoading, isError } = useQuery({
        queryKey: ["trucks", offset, vehicleType],
        queryFn: () =>
            getTrailerList(offset, limit, undefined, vehicleType),
    });

    console.log(data)

    const vehicles = data?.data?.data?.vehicles || [];

    console.log(vehicles)

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (isError) return <div className="p-6 text-red-500">Error loading trucks</div>;


    const handletraileradd = () => {
        navigate('/traileradds')

    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Trailer</h1>

                <button onClick={handletraileradd} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
                    + Add Trailer
                </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-[300px] h-[45px] px-6 p-7  rounded-xl font-semibold border border-gray-300 bg-white  focus:outline-none"
                />
                <div className='bg-red-500 hover:bg-red-600 text-white p-5 rounded-lg' >
                    <FiFilter size={20} />
                </div>
            </div>

    
            <div className="bg-white rounded-2xl shadow-md p-6">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-500 text-sm border-none">
                            <th className="pb-4">S.No</th>
                            <th className="pb-4">License plate</th>
                            <th className="pb-4">Capacity</th>
                            <th className="pb-4">Owner</th>
                            <th className="pb-4">Phone number</th>
                            <th className="pb-4">Insurance</th>
                            <th className="pb-4">Documents</th>
                            <th className="pb-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {vehicles.map((item: any, index: number) => (
                            <tr key={item.vehicleId} className="border-none ">
                                <td className="py-4">{index + 1}</td>
                                <td className="py-4">{item.licensePlateNo}</td>
                                <td className="py-4">{item.capacityInTons}</td>
                                <td className="py-4">{item.ownerName}</td>
                                <td className="py-4">
                                    {item.countryCode}
                                    {item.mobile}
                                </td>
                                <td className="py-4">--</td>
                                <td className="py-4">
                                    <button className="text-blue-600 underline">
                                        view documents
                                    </button>
                                </td>
                                <td className="py-4 flex gap-4">
                                    <button>edit</button>
                                    <button className="text-red-500">delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {vehicles.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No trailers found
                    </div>
                )}
            </div>
        </div>
    );



}

export default Trailerdetail
