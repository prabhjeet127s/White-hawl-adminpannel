
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
import Ongoingload from './Pages/OnGoingLoad/Ongoingload'
import Completedload from './Pages/CompletedLoads/Completedload'
import Pendingfleetowner from './Pages/Pendingfleetowner/Pendingfleetowner'
import Driverrequest from './Pages/Driverrequest/Driverrequest'

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
          <Route path='ongoing-loads' element={<Ongoingload/>}  />
          <Route path='/complete-loads' element={<Completedload/>} />
          <Route path="/pending-fleetowner" element={<Pendingfleetowner/>} />
          <Route path='/driver-request' element={<Driverrequest/>} />

          
         </Routes>
        </Defaultlayout>






      )





  )
}

export default App
