
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './Pages/Signin/Signin'
import { useLocation } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Defaultlayout from './Layout/Defaultlayout'
import Truck from './Pages/Trucks/Truck'
import Truckadd from './Pages/Trucks/Truckadd'
import Fleetownerprofile from './Pages/Fleetowner/Fleetownerprofile'
import Traileradds from './Pages/Trailer/Traileradds'
import Trailerdetail from './Pages/Trailer/Trailerdetail'
import Driver from './Pages/Drivers/Driver'

function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isAuthpath = pathname.startsWith('/auth')

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && location.pathname !== "/auth/signin") {
      navigate("/auth/signin");
    }
  }, [navigate, location.pathname]);

  return (


    isAuthpath ? (
      <Routes>
        <Route path='/auth/signin' element={<Signin />} />
      </Routes>) :

      (


        <Defaultlayout>
        <Routes>
          <Route path='/'  element={<Dashboard/>}  />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/truck'   element={<Truck/>} />
          <Route path='/truck-add' element={<Truckadd/>  }   />
          <Route path='/fleetowner'  element={<Fleetownerprofile/>} />
          <Route path='/traileradds' element={<Traileradds/>} />
          <Route path='/Trailer'  element={<Trailerdetail/>}  />
          <Route path='/drivers'  element={<Driver/>}  />
          
         </Routes>
        </Defaultlayout>






      )





  )
}

export default App
