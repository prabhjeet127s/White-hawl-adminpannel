import { useQuery } from "@tanstack/react-query";
import  { useEffect } from "react";
import { Deletedriver, getDriverList } from "../../API Service/Driver/Driverlist";
import { FaEdit, FaTrash } from "react-icons/fa";
import { UpdateDriverstatus } from "../../API Service/Driver/Driverlist";
import { useState } from "react";
import { IoFunnelOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

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
    const [filterstatus, setfilterstatus] = useState(undefined)
    const [Isdeletemodal, setIsdeletemodal] = useState(false);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["driver", filterstatus],
        queryFn: () => getDriverList(0, 10, filterstatus),
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
    useEffect(() => {
        console.log(status + 'hejdjcnjencejnejcxnedj')


    }, [status])


    const handleeditclick = (driver:any) => {

        setids(driver.driverId)
        setuser(driver)
        setisEditModal(true)

    }

    const handleisdeleteclick = (id:any) => {
        setids(id)
        setIsdeletemodal(!Isdeletemodal)

    }

    const handleDeleteClick = async () => {

        try {
            const response = await Deletedriver(ids);
            console.log(response)
            if (response.status == 200) refetch();
        } catch (error) {
            console.log(error);
        }


    };



    if (isLoading) return <p className="p-5">Loading...</p>;
    if (isError) return <p className="p-5 text-red-500">Error loading drivers</p>;

    return (
        <>
            <div className="bg-gray-200 p-6">
                <h1 className="text-2xl font-semibold mb-4">Drivers</h1>

                <div className="flex items-center gap-4">

                    <input
                        type="text"
                        placeholder="Search"
                        className="w-96 px-4 py-3 rounded-lg bg-white border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    <button
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg 
                     flex items-center justify-center transition"  >
                        <IoFunnelOutline size={20} />

                    </button>

                    <select value={filterstatus} onChange={(e:any) => setfilterstatus(e.target.value)}
                        className="px-3 py-3 rounded-lg bg-white border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>All</option>
                        <option>active</option>
                        <option>inactive</option>
                    </select>

                </div>
            </div>
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
                            {drivers.map((driver:any, index: number) => {
                                const licenseImage =
                                    driver?.documentArray?.find(
                                        (doc:any) => doc.docType === "license"
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
                                        <td className="p-4 pt-7.5 flex gap-4">
                                            <button onClick={() => handleeditclick(driver)} >
                                                <FaEdit className="cursor-pointer text-gray-600 hover:text-black" />
                                            </button>
                                            <FaTrash onClick={() => handleisdeleteclick(driver.driverId)} className="cursor-pointer text-red-500 hover:text-red-700" />
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

            {Isdeletemodal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-3 relative">
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                        <div className="bg-white w-105 rounded-xl shadow-lg p-6 relative">

                            <button
                                onClick={() => setIsdeletemodal(!Isdeletemodal)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                            >
                                <IoClose size={22} />
                            </button>

                            <p className="text-center text-lg text-gray-700 mb-8">
                                Are you sure you want to delete <span className="font-semibold">Driver</span>?
                            </p>


                            <div className="flex justify-center gap-6">
                                <button onClick={handleDeleteClick} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition" >
                                    Continue
                                </button>
                                <button onClick={() => setIsdeletemodal(!Isdeletemodal)} className="text-gray-600 font-medium hover:text-black" >
                                    Skip
                                </button>
                            </div>
                        </div>
                    </div>

                </div></div>}
        </>
    );
};

export default Driver;
