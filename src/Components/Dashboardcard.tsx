

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition duration-300">
      <div>
        <p className="text-red-500 font-medium text-sm">{title}</p>
        <h2 className="text-2xl font-semibold mt-2">{value}</h2>
      </div>

      <div className="text-gray-300 text-5xl">
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
