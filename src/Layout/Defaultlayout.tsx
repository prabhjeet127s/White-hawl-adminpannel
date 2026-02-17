
import { useEffect, useState, type ReactNode } from 'react'
import Header from '../Components/Header/Header'

import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'


const Defaultlayout:React.FC<{ children: ReactNode }> = ({children}) => {

    const [Sidebaropen, setSidebaropen] = useState(false)

    const navigate=useNavigate()
  
    


     useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && location.pathname !== "/auth/signin") {
      navigate("/auth/signin");
    }
    
  }, [navigate, location.pathname]);
  


    return (
        <div>

            <Header sidebarOpen={Sidebaropen}  setSidebarOpen={setSidebaropen}  />
            <Sidebar  sidebarOpen={Sidebaropen} setSidebaropen={setSidebaropen}  />
             <div  className={` transition-all duration-500 ease-in-out bg-gray-100  h-auto  min-h-screen     ${Sidebaropen
               ? "pl-80" : "pl-1"}`}> {children   }</div>
        </div>
    )
}

export default Defaultlayout