import { HiMenu } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

interface prop{
    sidebarOpen:boolean,
    setSidebarOpen: (arg: boolean) => void;
    


}
    


const Header = ({sidebarOpen,setSidebarOpen}:prop  )   => {

    
  return (
    <header className="h-16   shadow-sm flex items-center justify-between px-6">

    
      <button
        onClick={()=>setSidebarOpen(!sidebarOpen)}
        className="text-gray-600    text-2xl" >
        <HiMenu />
      </button>

    
      <div className="flex items-center gap-3 cursor-pointer">
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="text-gray-700 font-medium">Admin</span>
        <IoChevronDown className="text-gray-500" />
      </div>
    </header>
  );
};

export default Header;
