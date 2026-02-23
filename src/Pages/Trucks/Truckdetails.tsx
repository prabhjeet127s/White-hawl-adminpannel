import { useQuery } from "@tanstack/react-query";
import { Deletetrucklist, getTrucksList } from "../../API Service/Truck/Truck";
import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";


const Truckdetails = () => {

  const navigate = useNavigate();

  const [Idocopen, setIdocopen] = useState(false)
  const [offset] = useState<number>(0);
  const limit = 10;
  const vehicleType = "truck";
  const [ids, setids] = useState("")
  const [Isdeletemodal, setIsdeletemodal] = useState(false);



  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["trucks", offset, vehicleType],
    queryFn: () =>
      getTrucksList(offset, limit, undefined, vehicleType),
  });

  const vehicles = data?.data?.data?.vehicles || [];
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading trucks</div>;

  const handleeditclick = (id:any) => {
    navigate(`/trucks-edit/${id}`)
  }
  const handleisdeleteclick = (id:any) => {
    setids(id)
    setIsdeletemodal(!Isdeletemodal)
    console.log(Isdeletemodal)
  }

  const handleDeleteClick = async () => {
    try {
      const response = await Deletetrucklist(ids);
      console.log(response)
      if (response.status == 200) refetch();
    } catch (error) {
      console.log(error);
    }

    setIsdeletemodal(!Isdeletemodal)






  };


  return (

    <>

      <div className="bg-white rounded-xl h-auto min-h-122.5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">


            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">S.No</th>
                <th className="px-6 py-4">License plate</th>
                <th className="px-6 py-4">Assign Driver</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Phone number</th>
                <th className="px-6 py-4">Documents</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>


            <tbody className="divide-y divide-gray-200">
              {vehicles.map((item: any, index: number) => (
                <tr key={item.vehicleId} className="hover:bg-gray-50 transition">

                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4 font-medium">
                    {item.licensePlateNo}
                  </td>

                  <td className="px-6 py-4">
                    {item.driverName || "Pending"}
                  </td>

                  <td className="px-6 py-4">
                    {item.capacityInTons}
                  </td>

                  <td className="px-6 py-4">
                    {item.ownerName}
                  </td>

                  <td className="px-6 py-4">
                    {item.countryCode}{item.mobile}
                  </td>

                  <td className="px-6 py-4">
                    <button onClick={() => setIdocopen(!Idocopen)} >
                      <span className="text-blue-600 underline cursor-pointer">
                        View Documents
                      </span>
                    </button>
                  </td>

                  <td className="px-6 py-4 flex gap-4">
                    <FiEdit2 onClick={() => handleeditclick(item.vehicleId)} className="cursor-pointer text-gray-600 hover:text-black" />
                    <FiTrash2 onClick={() => handleisdeleteclick(item.vehicleId)} className="cursor-pointer text-red-500 hover:text-red-700" />
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>


      {Idocopen && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-3 relative">
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
                    <IoClose size={22}     />
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

export default Truckdetails;
