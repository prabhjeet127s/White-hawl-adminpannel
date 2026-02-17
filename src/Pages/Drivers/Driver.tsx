import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getDriverList } from "../../API Service/Driver/Driverlist";
import { FaEdit, FaTrash } from "react-icons/fa";
import { UpdateDriverstatus } from "../../API Service/Driver/Driverlist";
import { useState } from "react";


interface Driver {
    id: number;
    firstName: string;
    lastName: string;
    status: string;
}


const Driver = () => {

    const [isEditModal, setisEditModal] = useState<boolean>(false)
    const [user, setuser] = useState<Driver>()
    const [status, setstatus] = useState<string>("")
    const [ids, setids] = useState("")
    



    const { data, isLoading, isError,refetch } = useQuery({
        queryKey: ["driver"],
        queryFn: () => getDriverList(0, 10),
    });
    console.log(data)
    const drivers = data?.data?.data?.drivers || [];
    console.log(drivers)


    const handleclickstatus = async () => {
        try {
            const userstatus = {
                driverId: ids,
                status: status,
            };

            const response = await UpdateDriverstatus(userstatus);
            console.log("Status updated:", response);

        } catch (error) {
            console.log("Error updating status:", error);
        }

        setisEditModal(false)
        refetch()

    };
      useEffect(()=>{
        console.log(status +'hejdjcnjencejnejcxnedj')


        },[status ])


    const handleeditclick = (driver) => {
        setids(driver.driverId)

        setuser(driver)
        setisEditModal(true)



    }




    if (isLoading) return <p className="p-5">Loading...</p>;
    if (isError) return <p className="p-5 text-red-500">Error loading drivers</p>;

    return (
        <>
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4">S.no</th>
                            <th className="p-4">Assign Truck</th>
                            <th className="p-4">Driver Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone Number</th>
                            <th className="p-4">Driving License</th>
                            <th className="p-4">Joining Date</th>
                            <th className="p-4">Joining Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {drivers.map((driver, index: number) => {
                            const licenseImage =
                                driver?.documentArray?.find(
                                    (doc) => doc.docType === "license"
                                )?.mediaUrl || "";

                            return (
                                <tr
                                    className="border-t hover:bg-gray-50 transition" >
                                    <td className="p-4">{index + 1}</td>

                                    {/* assignk */}
                                    <td className="p-4">
                                        {driver?.isVehicleAssigned ? (
                                            <button className="px-4 py-2 rounded-lg border border-green-500 text-green-600">
                                                Assigned
                                            </button>
                                        ) : (
                                            <button className="px-4 py-2 rounded-lg border border-red-500 text-red-500">
                                                Assign Truck
                                            </button>
                                        )}
                                    </td>

                                    {/* name */}
                                    <td className="p-4 capitalize">
                                        {driver?.firstName} {driver?.lastName}
                                    </td>

                                    {/* email */}
                                    <td className="p-4">{driver?.email}</td>

                                    {/* number */}
                                    <td className="p-4">
                                        {driver?.phoneNumber || "--"}
                                    </td>

                                    {/* photo */}
                                    <td className="p-4">
                                        {licenseImage ? (
                                            <img
                                                src={licenseImage}
                                                alt="license"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-300" />
                                        )}
                                    </td>

                                    {/* join date */}
                                    <td className="p-4">
                                        {driver?.createdAt
                                            ? new Date(driver.createdAt)
                                                .toLocaleDateString("en-GB")
                                            : "--"}
                                    </td>

                                    {/* status */}
                                    <td className="p-4">
                                        <button className="" >
                                            <span className=" font-bold capitalize">
                                                {driver?.status}
                                            </span>
                                        </button>
                                    </td>

                                    {/* action */}
                                    <td className="p-4 flex gap-4">
                                        <button onClick={() => handleeditclick(driver)} >
                                            <FaEdit className="cursor-pointer text-gray-600 hover:text-black" />
                                        </button>
                                        <FaTrash className="cursor-pointer text-red-500 hover:text-red-700" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
            {isEditModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-3 relative">
                    <h3
                        className="text-center capitalize pt-3 text-2xl"  >
                        Edit    {user?.firstName} {user?.lastName}
                    </h3>
                    <div className="flex flex-col p-3.5 gap-2    ">
                        <label className="text-2xl font-semibold" htmlFor="">Status</label>
                        <select  value={status} onChange={(e)=>setstatus(e.target.value)} name="" id=""   
                        className="  border-4 border-gray-100"
                         >
                            <option value="">Select Status</option>
                            <option value="active">active</option>
                            <option value="inactive">inacive</option>

                        </select>
                    </div>
                    <div className="text-right  p-5">
                        <button  onClick={()=>setisEditModal(!isEditModal)} className="bg-gray-200 mx-4 hover:bg-gray-300 p-2 px-4 text-lg rounded-xl" >Cancel</button>
                        <button 
                         onClick={ handleclickstatus}
                        className="bg-black mx-4 p-2 px-4 text-lg rounded-xl text-white hover:bg-red-400" >Save</button>
                    </div>

                </div>
            </div>)
            }
        </>
    );
};

export default Driver;
