import { NavLink } from "react-router-dom";
import { FaHome, FaWallet } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebaropen:(value:boolean)=>void
  
}


const Sidebar = ({ sidebarOpen,setSidebaropen}:SidebarProps) => {


 const sidebarMenu = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: <FaHome />,
  },
  {
    title: "Loads",
    route: "/ongoing-loads",
    icon: <MdLocalShipping />,
  },
  {
    title: "Trips",
    route: "/trips",
    icon: <MdLocalShipping />,
  },
  {
    title: "Completed Loads",
    route: "/complete-loads",
    icon: <MdLocalShipping />,
  },
  {
    title: "Drivers",
    route: "/drivers",
    icon: <GiSteeringWheel />,
  },
  {
    title: "Drivers Requests",
    route: "/driver-request",
    icon: <GiSteeringWheel />,
  },
  {
    title: "Operators",
    route: "fleetowner",
    icon: <FaUserCog />,
  },
  {
    title: "Operators Requests",
    route: "/pending-fleetowner",
    icon: <FaUserCog />,
  },
  {
    title: "Trucks",
    route: "/truck",
    icon: <FaTruck />,
  },
  {
    title: "Trailer",
    route: "/trailer",
    icon: <FaTruck />,
  },
  {
    title: "Expense",
    route: "/expense",
    icon: <FaWallet />,
  },
  {
    title: "Track",
    route: "/track",
    icon: <FaMapMarkerAlt />,
  },
];


  return (
    <aside
      className={`fixed  left-0 top-18  bottom-8 bg-white shadow-lg rounded-xl transition-all duration-300
          ${sidebarOpen ? "w-80" : "w-0 overflow-hidden"}
      `}
    >

      <div className="flex flex-col p-2 px-4 ">
        {sidebarMenu.map((item) => (
          <NavLink
          onClick={()=>setSidebaropen(!sidebarOpen)}
            to={item.route}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3  text-xl rounded-xl w-72 
              ${isActive ? "bg-gray-800 text-white" : "text-gray-600"}
              hover:bg-gray-600`
            }
          >
            {item.icon}  
            {item.title}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;