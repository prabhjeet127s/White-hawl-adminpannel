import { FaFilter } from "react-icons/fa";

const Driverrequest = () => {



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      
      <h1 className="text-2xl font-semibold mb-6">
        Drivers Requests
      </h1>

      
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-80 px-4 py-2 rounded-xl bg-gray-200 outline-none"
        />
        <button className="bg-red-500 p-3 rounded-xl text-white">
          <FaFilter />
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="grid grid-cols-6 text-gray-600 font-medium mb-6">
          <p>S.no</p>
          <p>Driver Name</p>
          <p>Email</p>
          <p>Phone Number</p>
          <p>Driving license</p>
          <p>Actions</p>
        </div>

        
        <div className="flex justify-center items-center h-64 text-gray-400 text-lg">
          No data found
        </div>

      </div>
    </div>
  );
};
export default Driverrequest;
