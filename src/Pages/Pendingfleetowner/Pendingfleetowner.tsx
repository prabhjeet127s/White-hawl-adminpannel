import { useQuery } from '@tanstack/react-query'
import { Getpendingfleetowner } from '../../API Service/Pendingfleetowner/Pendingfleetowner'
import { FaCheck, FaTimes, FaFilter } from "react-icons/fa"

const Pendingfleetowner = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["pending"],
        queryFn: () => Getpendingfleetowner(0, 10)
    })
    console.log(data)

    const fleetOwners = data?.data?.data?.fleetOwners;
    console.log(fleetOwners)

    if (isLoading) return <p className="p-6">Loading...</p>
    if (isError) return <p className="p-6">Error fetching data</p>

    return (
        <div className="min-h-screen bg-gray-200 p-6">

            
            <h2 className="text-2xl font-semibold mb-6">
                Operators Requests
            </h2>

        
            <div className="flex items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-80 px-4 py-3 rounded-xl bg-gray-100 outline-none"
                />
                <button className="bg-red-500 text-white p-3 rounded-xl">
                    <FaFilter />
                </button>
            </div>

    
            <div className="bg-white rounded-3xl p-8 shadow-sm">

                <table className="w-full text-left">

                    <thead className=" border-none  text-gray-600">
                        <tr>
                            <th className="pb-6">S.no</th>
                            <th className="pb-6">Operator Name</th>
                            <th className="pb-6">Email</th>
                            <th className="pb-6">Phone Number</th>
                            <th className="pb-6">Driving license</th>
                            <th className="pb-6">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fleetOwners.map((item:any, index:any) => (
                            <tr key={item.fleetOwnerId} className="border-none">

                                <td className="py-6">{index + 1}</td>

                                <td className="py-6 ">
                                    {item.firstName} {item.lastName}
                                </td>

                                <td className="py-6">{item.email}</td>

                                <td className="py-6">
                                    {item.countryCode}{item.mobile}
                                </td>

                                <td className="py-6">--</td>

                                <td className="py-6">
                                    <div className="flex gap-4">

                                        
                                        <button className="bg-green-400 text-white p-2 rounded-full">
                                            <FaCheck />
                                        </button>

                                        
                                        <button className="bg-red-500 text-white p-2 rounded-full">
                                            <FaTimes />
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

                {fleetOwners.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No Pending Requests
                    </div>
                )}

            </div>

        </div>
    )
}

export default Pendingfleetowner
