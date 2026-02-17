import { useQuery } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { getFleetOwnerList } from "../../API Service/Fleetowner/Fleetowner";
import { FiSearch } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";

const Fleetownerprofile = () => {
    const { data } = useQuery({
        queryKey: ["fleetowner"],
        queryFn: () => getFleetOwnerList(),
    });

    const fleetowner = data?.data?.data?.fleetOwners || [];

    return (
        <>

            <div className="mb-6 gap-2 ">
                <h2 className="text-2xl ml-15 font-semibold text-gray-800 mb-5">
                    Operators
                </h2>


                <div className="flex items-center gap-4">
                    <div className="  w-[380px]">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full h-[50px] m-10 p-2 pr-10 rounded-xl bg-white
                   focus:outline-none text-gray-700"
                        />
                        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                    <button className="w-[60px] h-[50px] m bg-red-500 
                       rounded-xl flex items-center justify-center 
                       hover:bg-red-600 transition">
                        <HiOutlineFilter className="text-white text-xl" />
                    </button>
                    <div>
                        <select
                            className="w-[120px] h-[50px] rounded-xl bg-gray-100 
                   px-4 text-gray-700 focus:outline-none" >
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                </div>
            </div>



            <div className="bg-white p-15 mx-6 rounded-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">


                        <thead>
                            <tr className="text-gray-600 text-sm font-semibold border-none ">
                                <th className="py-4 ">S.no</th>
                                <th className="py-4 ">Operator Name</th>
                                <th className="py-4 ">Email</th>
                                <th className="py-4 ">Phone Number</th>
                                <th className="py-4 ">Driving License</th>
                                <th className="py-4 ">Joining Date</th>
                                <th className="py-4 ">Joining Status</th>
                                <th className="py-4 ">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="text-gray-800 border-none text-sm">
                            {fleetowner.map((item, index: number) => (
                                <tr key={item.fleetOwnerId} className="">

                                    <td className="py-5 ">{index + 1}</td>

                                    <td className="py-5  font-medium">
                                        {item.firstName} {item.lastName}
                                    </td>

                                    <td className="py-5 ">{item.email}</td>

                                    <td className="py-5 ">
                                        {item.countryCode}
                                        {item.mobile}
                                    </td>

                                    <td className="py-5 ">--</td>

                                    <td className="py-5 ">
                                        {item.createdAt
                                            ? new Date(item.createdAt).toLocaleDateString()
                                            : "--"}
                                    </td>

                                    <td className="py-5 ">
                                        <span
                                            className={`font-medium ${item.status === "active"
                                                ? "text-green-600"
                                                : "text-red-500"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="py-5  flex items-center gap-4">
                                        <FiEdit className="cursor-pointer text-gray-600 hover:text-black" />
                                        <MdDeleteOutline className="cursor-pointer text-red-500 hover:text-red-700" />
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

        </>
    );
};

export default Fleetownerprofile;
