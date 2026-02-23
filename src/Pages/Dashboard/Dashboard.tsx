import DashboardCard from "../../Components/Dashboardcard";

import { FaDollarSign, FaTruck, FaWallet, FaUser } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";

const Dashboard = () => {

  const dashboardData = [
    {
      title: "Total Earning",
      value: "$0",
      icon: <FaDollarSign />,
    },
    {
      title: "Loads",
      value: 0,
      icon: <MdLocalShipping />,
    },
    {
      title: "Completed Loads",
      value: 0,
      icon: <FaTruck />,
    },
    {
      title: "Expense",
      value: "$0",
      icon: <FaWallet />,
    },
    {
      title: "Trucks",
      value: 0,
      icon: <FaTruck />,
    },
    {
      title: "Trailers",
      value: 0,
      icon: <FaTruck />,
    },
    {
      title: "Drivers",
      value: 0,
      icon: <GiSteeringWheel />,
    },
    {
      title: "Fleet Owner",
      value: 0,
      icon: <FaUser />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {dashboardData.map((item, index) => (
        <DashboardCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Dashboard;
