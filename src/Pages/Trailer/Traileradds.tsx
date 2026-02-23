import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getFleetOwnerList } from "../../API Service/Fleetowner/Fleetowner";
import { useNavigate } from "react-router-dom";
import { AddTrucks } from "../../API Service/Truck/Addtrucks";
const Traileradds = () => {
    const navigate = useNavigate();

    const [license, setLicense] = useState("")
    const [capacity, setCapacity] = useState('')
    const [fleet, setFleet] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [vechicleimage, setVechicleimage] = useState<File[]>([])
    const [vechicleimageprev, setvechicleimageprev] = useState<string[]>([])


    const { data } = useQuery({
        queryKey: ["fleetowner"],
        queryFn: () => getFleetOwnerList(0, 10)
    })
    const fleetowner = data?.data?.data?.fleetOwners || []

    const handleimageupload = (e: React.ChangeEvent<HTMLInputElement>) => {

        const newfiles = e.target.files ? Array.from(e.target.files) : [];

        if (newfiles.length === 0) return;

        const updatefiles = [...vechicleimage, ...newfiles];
        setVechicleimage(updatefiles)

        const updatedPreviews = updatefiles.map((file) =>
            URL.createObjectURL(file))

        setvechicleimageprev(updatedPreviews)

    }



    const Onclickhandle = async (e:any) => {

        e.preventDefault();
        try {
            const data = {
                ownerId: fleet,
                vehicleType: "trailer",
                countryCode: "+1",
                mobile: phone,
                licensePlateNo: license,
                capacityInTons: Number(capacity),
                address: address,
                location: {
                    type: "Point",
                    coordinates: [76.7885, 30.7363],
                }
            };
            const response = await AddTrucks(data)
            console.log(response)
            alert("VEHICLE ADDED SUCESSFULLY")
        } catch (error) {
            console.log(error)
        }

        navigate('/trailer')
    }
     const handleback = () => {

            navigate('/trailer')
        }

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-start p-10">
            <div className="bg-white w-full max-w-6xl rounded-2xl p-10 shadow">

                <button onClick={handleback} className="text-red-600 mb-6 text-sm font-semibold">
                    &lt; Back
                </button>

                <form onSubmit={Onclickhandle}>

                    <h2 className="text-xl font-semibold mb-8">
                        Trailer Details
                    </h2>
                    <section>
                        <div className="grid grid-cols-3 gap-10">

                            {/* License */}
                            <div className="flex flex-col">
                                <label className="mb-2">License Plate *</label>
                                <input
                                    type="text"
                                    value={license}
                                    onChange={(e) => setLicense(e.target.value)}
                                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition  bg-gray-100 p-4 rounded-xl border focus:outline-none"
                                    placeholder="Enter license plate"
                                    required
                                />
                            </div>

                            {/* Capacity */}
                            <div className="flex flex-col">
                                <label className="mb-2">Capacity (Tons) *</label>
                                <input
                                    type="text"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition  bg-gray-100 p-4 rounded-xl border focus:outline-none"
                                    placeholder="e.g., 80"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div className="flex flex-col">
                                <label className="mb-2">Address *</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-100 p-4 rounded-xl border focus:outline-none"
                                    placeholder="Address"
                                    required
                                />

                            </div>

                            {/* Latitude */}
                            <div className="flex flex-col">
                                <label className="mb-2">Latitude *</label>
                                <input
                                    type="text"

                                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-100 p-4 rounded-xl border focus:outline-none"
                                    placeholder="27.857709"
                                    required
                                />
                            </div>

                            {/* Longitude */}
                            <div className="flex flex-col">
                                <label className="mb-2">Longitude *</label>
                                <input
                                    type="text"
                                    className="bg-gray-100 p-4 rounded-xl border focus:outline-none  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition "
                                    placeholder="11.113727"
                                    required
                                />
                            </div>

                            {/* Fleet Owner */}
                            <div className="w-full max-w-md">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Fleet Owner *
                                </label>
                                <select value={fleet} onChange={(e) => setFleet(e.target.value)} className=" w-full p-4 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" >
                                    <option value="">Select Owner  </option>
                                    {fleetowner?.map((value:any) => (
                                        <option
                                            key={value?.fleetOwnerId}
                                            value={value?.fleetOwnerId}
                                        >
                                            {value?.firstName} {value?.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label className="mb-2">Phone Number *</label>
                                <div className="flex gap-3">
                                    <input
                                        placeholder="+91"
                                        type="text"
                                        className=" focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition  bg-gray-100 p-4 rounded-xl border w-24"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className=" focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-100 p-4 rounded-xl border flex-1"
                                        placeholder="9876543210"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Trailer Images */}
                            <div>
                                <div className="flex flex-col">
                                    <label className=" block mb-2">Trailer Images *</label>
                                    <input
                                        onChange={handleimageupload}
                                        type="file"
                                        multiple
                                        className="border-black "
                                    />
                                </div>
                                <div className='flex gap-3 overflow-x-auto min-w-auto max-w-full'  >
                                    {vechicleimageprev.map((preview, index) => (

                                        <div key={index} className="relative inline-block w-20 h-20" >
                                            <img src={preview}
                                                alt={`Trailer Image ${index + 1}`}
                                                className='w-full h-full object-cover rounded-md shadow'
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </section>

                    <section>

                        {/* Documents Section */}
                        <h3 className="text-lg font-semibold mt-10 mb-4">
                            Documents
                        </h3>

                        <div className="grid grid-cols-3 gap-6 items-center">

                            <select
                                className="bg-gray-100 p-4 rounded-xl border"
                            >
                                <option value="">Select Document Type</option>
                                <option value="rc">RC</option>
                                <option value="insurance">Insurance</option>
                            </select>

                            <input
                                type="file" />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-center mt-10">
                            <button
                                type="submit"
                                className="bg-red-500 text-white px-10 py-3 rounded-xl text-lg"
                            >
                                Create Trailer
                            </button>
                        </div>
                    </section>

                </form>
            </div>
        </div>
    );
};

export default Traileradds;
