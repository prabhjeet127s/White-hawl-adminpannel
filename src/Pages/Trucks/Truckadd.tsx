import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getFleetOwnerList } from '../../API Service/Fleetowner/Fleetowner'
import { AddTrucks } from '../../API Service/Truck/Addtrucks'
import { useNavigate } from 'react-router-dom'

const Truckadd = () => {

    const navigate = useNavigate();

    const [license, setLicense] = useState("")
    const [capacity, setCapacity] = useState('')
    const [fleet, setFleet] = useState("")
    const [phone, setPhone] = useState("")
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [address, setAddress] = useState("")
    

    const [vechicleimage, setVechicleimage] = useState<File[]>([])
    const [vechicleimageprev, setvechicleimageprev] = useState<string[]>([])

    const { data } = useQuery({
        queryKey: ["fleetowner"],
        queryFn: () => getFleetOwnerList(0, 10)
    })

    const handleimageupload = (e: React.ChangeEvent<HTMLInputElement>) => {

        const newfiles = e.target.files ? Array.from(e.target.files) : [];

        if (newfiles.length === 0) return;

        const updatefiles = [...vechicleimage, ...newfiles];
        setVechicleimage(updatefiles)

        const updatedPreviews = updatefiles.map((file) =>
            URL.createObjectURL(file))

        setvechicleimageprev(updatedPreviews)

    }
    const handleback = () => {

        navigate('/truck')
    }

    /** 
  const removeVehicleImage = (index: number) => {
    const newFiles = vechicleimage.filter((_, i) => i !== index);
    setvechicleimageprev(newFiles);

    const newPreviews = vehicleImagePreviews.filter((_, i) => i !== index);
    setVehicleImagePreviews(newPreviews);
  };

//   */



    const Onclickhandle = async (e) => {

        e.preventDefault();
        try {
            const data = {
                ownerId: fleet,
                vehicleType: "truck",
                countryCode: "+1",
                mobile: phone,
                licensePlateNo: license,
                capacityInTons: Number(capacity),
                make: make,
                model: model,
                address: address,
                location: {
                    type: "Point",
                    coordinates: [76.7885, 30.7363],
                }
            };
            const response = await AddTrucks(data)
            alert("VEHICLE ADDED SUCESSFULLY")




        } catch (error) {
            console.log(error)
        }

        navigate('/truck')


    }

    const fleetowner = data?.data?.data?.fleetOwners || []

    return (

        <div className="bg-gray-100 min-h-screen flex justify-center items-start p-10">

        <div className={`bg-white w-full max-w-6xl rounded-2xl p-10 shadow  `} >

            <button onClick={handleback} className='text-red-500 text-xl p-4 '  >   back </button>


            <form action="" onSubmit={Onclickhandle} >

                <h3 className='text-2xl font-semibold p-1 pt-4 '  >Add Trucks</h3>

                <section   >
                    <h3 className='p-4 font-semibold text-xl   ' >Truck Details</h3>
                    <div className=' p-3 pt-7  gap-10  grid grid-cols-3 ' >

                        <div className='flex flex-col '>

                            <label htmlFor="License Plate">License Plate *
                            </label>
                            <input value={license} onChange={(e) => setLicense(e.target.value)} className='bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition w-77 p-4 rounded-xl ' placeholder='Enter license plate' type="text" id='License Plate' required />

                        </div>

                        <div className='flex flex-col '>

                            <label htmlFor="Capacity (Tons)">Capacity (Tons) *
                            </label>
                            <input value={capacity} onChange={(e) => setCapacity(e.target.value)} className='bg-gray-100 w-77 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-4 rounded-xl ' placeholder='Eg-80' type="text" id='Capacity (Tons)' required />

                        </div>

                        <div className="w-full max-w-md">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Fleet Owner *
                            </label>
                            <select value={fleet} onChange={(e) => setFleet(e.target.value)} className=" w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" >
                                <option value="">Select Owner  </option>
                                {fleetowner?.map((value) => (
                                    <option
                                        key={value?.fleetOwnerId}
                                        value={value?.fleetOwnerId}
                                    >
                                        {value?.firstName} {value?.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Country Code *
                                </label>

                                <input
                                    required
                                    type="text"
                                    placeholder="+1"
                                    className=" w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Phone Number *
                                </label>

                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="text"
                                    placeholder="9876543210"
                                    className=" w-full px-4 py-3 rounded-xl border border-gray-300  bg-gray-100 text-gray-700  focus:outline-none  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition "
                                    required
                                />
                            </div>

                        </div>

                        {/**helo */}
                        <div className='flex flex-col '>
                            <label htmlFor="License Plate">Make *
                            </label>
                            <input value={make} onChange={(e) => setMake(e.target.value)}
                                className='bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition  w-77 p-4 rounded-xl '
                                placeholder='Make (e.g...Freightliner' type="text" id='License Plate' required />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="Model">Model *
                            </label>
                            <input value={model} onChange={(e) => setModel(e.target.value)}
                                className='bg-gray-50  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition  w-77 p-4 rounded-xl '
                                placeholder='Model (e.g;Cascadia) ' type="text" id='Model' required />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="Address">Address *
                            </label>
                            <input value={address} onChange={(e) => setAddress(e.target.value)}
                                className='bg-gray-50 w-77  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-4 rounded-xl '
                                placeholder='Address *' type="text" id='Address *' required />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="Longitude ">Longitude *
                            </label>
                            <input
                                className='bg-gray-50 w-77 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-4 rounded-xl '
                                placeholder='Longitude ' type="text" id='Longitude ' required />
                        </div>

                        <div className='flex flex-col '>
                            <label htmlFor="Latitude">Latitude *
                            </label>
                            <input className='bg-gray-50 w-77 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition  p-4 rounded-xl '
                                placeholder='Latitude ' type="text" id='Latitude' required />
                        </div>

                        {/*upload document */}
                        <div className='flex   flex-col ' >
                            <label className=' border-black  block mb-2  font-semibold' htmlFor="">Trailer Images</label>

                            <input className='' type="file"
                                accept="image/*"
                                multiple
                                onChange={handleimageupload}

                            />
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

                    </div>{/*internal data */}

                    <div className=' p-4 pt-9 text-center' >

                        <button className=' p-2 rounded-2xl text-2xl border-2  hover:bg-red-500 transition duration-150 font-bold'>
                            Submit Here
                        </button>
                    </div>
                </section>


            </form>









        </div>
        </div>
    )
}

export default Truckadd
