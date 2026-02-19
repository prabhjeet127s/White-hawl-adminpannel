import { useQuery } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Deletefleetowner, getFleetOwnerList, updateOwnerstatus } from "../../API Service/Fleetowner/Fleetowner";
import { FiSearch } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { useState } from "react";
import axiosInstance from "../../Utils/axiosInstance";

const Fleetownerprofile = () => {


    const [isEditModal, setisEditModal] = useState(false)
    const [selectstatus, setselectstatus] = useState<any>()
    const [status, setstatus] = useState("")


    const { data,refetch } = useQuery({
        queryKey: ["fleetowner"],
        queryFn: () => getFleetOwnerList(),
    });

    const fleetowner = data?.data?.data?.fleetOwners || [];

    const handleeditclick = async (item) => {

        setselectstatus(item)
        setisEditModal(!isEditModal)
    }

    const handleclickstatus = async () => {
        try {
            const data = {
                fleetOwnerId: selectstatus.fleetOwnerId,
                status: status
            }

            const response = await updateOwnerstatus(data)
            console.log(response)

        } catch (error) {
            console.log(error)
        }
        setisEditModal(!isEditModal)
        refetch()

    }

      const handleDeleteClick = async (id) => {
            try {
          const response=   await Deletefleetowner(id);
                console.log(response)
                if(response.status==200) refetch();
            } catch (error) {
                console.log(error);
            }
    
        };


    return (
        <>

            <div className="mb-1  ">
                <h2 className="text-2xl ml-15 font-semibold pt-3 text-gray-800 ">
                    Operators
                </h2>


                <div className="flex items-center gap-5">
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
                            className="w-[120px] h-[50px] rounded-xl bg-white
                           px-4 text-gray-700 focus:outline-none" >
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                </div>
            </div>

            <div className="bg-white p-5 mx-6 rounded-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        <thead>
                            <tr className="text-gray-600  font-semibold border-none ">
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
                        <tbody className="text-gray-800 border-none ">
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
                                        <FiEdit onClick={() => handleeditclick(item)} size={25} className="cursor-pointer  text-gray-600 hover:text-black" />
                                        <MdDeleteOutline onClick={()=>handleDeleteClick(item.fleetOwnerId)}  size={25} className="cursor-pointer text-red-500 hover:text-red-700" />
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {isEditModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-3 relative">
                    <h3
                        className="text-center capitalize pt-3 text-2xl"  >
                        Edit  {selectstatus.firstName} {selectstatus.lastName}
                    </h3>
                    <div className="flex flex-col p-3.5 gap-2    ">
                        <label className="text-2xl font-semibold" htmlFor="">Status</label>
                        <select value={status} onChange={(e) => setstatus(e.target.value)} name="" id=""
                            className="  border-4 border-gray-100"
                        >
                            <option value="">Select Status</option>
                            <option value="active">active</option>
                            <option value="inactive">inacive</option>

                        </select>
                    </div>
                    <div className="text-right  p-5">
                        <button onClick={() => setisEditModal(!isEditModal)} className="bg-gray-200 mx-4 hover:bg-gray-300 p-2 px-4 text-lg rounded-xl" >Cancel</button>
                        <button
                            onClick={handleclickstatus}
                            className="bg-black mx-4 p-2 px-4 text-lg rounded-xl text-white hover:bg-red-400" >Save</button>
                    </div>

                </div>
            </div>)
            }

        </>
    );
};

export default Fleetownerprofile;
