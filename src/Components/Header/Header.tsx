import { HiMenu } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface prop {
  sidebarOpen: boolean,
  setSidebarOpen: (arg: boolean) => void;
}


const Header = ({ sidebarOpen, setSidebarOpen }: prop) => {
  const navigate=useNavigate();


  const [logouthandleopen, setlogouthandleopen] = useState(false)
  const [showmodal, setshowmodal] = useState(false)


  const handlelogoutopen = () => {
    setlogouthandleopen(!logouthandleopen)

  }
  const handlelogout = () => {

  setshowmodal(!showmodal)

   setTimeout(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/auth/signin");
  }, 500);
  }


  return (
    <header className="h-16   shadow-sm flex items-center justify-between px-6">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-gray-600    text-2xl" >
        <HiMenu />
      </button>

      <div className=" relative flex items-center gap-3 cursor-pointer">
        <FaUserCircle onClick={handlelogoutopen} className="text-2xl size-10 text-gray-600" />
        <span onClick={handlelogoutopen} className="text-gray-700  font-medium">Admin</span>
        <IoChevronDown onClick={handlelogoutopen} className="text-gray-500" />

        {logouthandleopen && <div className="position absolute top-11 h-15 w-50  border-gray-300 border-2  bg-white  right-0.5 shadow-2xl font-semibold" >
          <button onClick={()=>setshowmodal(!showmodal)} className="  hover:text-black text-center p-5 flex gap-3  text-gray-600"> <CiLogout size={25} />
            Logout</button>
        </div>
        }
      </div>

      {showmodal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-3 relative">
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white w-125 rounded-xl shadow-xl p-8 text-center relative">


              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full border-4 border-orange-300 flex items-center justify-center">
                  <span className="text-orange-400 text-4xl font-bold">!</span>
                </div>
              </div>

              <h2 className="text-3xl font-semibold text-gray-700 mb-2">
                loading...
              </h2>


              <p className="text-gray-500 mb-6">
                Do you really want to log out as Admin?
              </p>


              <div className="flex justify-center gap-4">
                <button
                  onClick={handlelogout}
                  className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                >
                  Yes, log me out
                </button>

                <button
                  onClick={() => setshowmodal(!showmodal)}
                  className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>}
    </header>
  );
};

export default Header;
