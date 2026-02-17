import { useQuery } from "@tanstack/react-query";
import { getTrucksList } from "../../API Service/Truck/Truck";
import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Truckdetails = () => {
  const [offset] = useState<number>(0);
  const limit = 10;
  const vehicleType = "truck";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trucks", offset, vehicleType],
    queryFn: () =>
      getTrucksList(offset, limit, undefined, vehicleType),
  });

  console.log(data)

  const vehicles = data?.data?.data?.vehicles || [];

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading trucks</div>;

  return (
    <div className="bg-white rounded-xl h-auto min-h-[490px] shadow-sm overflow-hidden">
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
                  <span className="text-blue-600 underline cursor-pointer">
                    View Documents
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-4">
                  <FiEdit2 className="cursor-pointer text-gray-600 hover:text-black" />
                  <FiTrash2 className="cursor-pointer text-red-500 hover:text-red-700" />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Truckdetails;
