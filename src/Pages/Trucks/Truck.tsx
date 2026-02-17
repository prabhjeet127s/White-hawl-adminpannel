import { FiFilter } from "react-icons/fi";
import Truckdetails from "./Truckdetails";
import { useNavigate } from "react-router-dom";

const Truck = () => {
  const navigate=useNavigate();

  const handleonclick=()=>{
    navigate('/truck-add')

  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔹 Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Trucks
        </h1>

        <button  onClick={handleonclick}  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition">
          + Add Truck
        </button>
      </div>

      {/* 🔹 Search + Filter UI */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-72 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
          <FiFilter size={20} />
        </button>
      </div>

      {/* 🔹 Table Component */}
      <Truckdetails />

    </div>
  );
};

export default Truck;
