
import { Outlet } from 'react-router-dom'
import './App.css'

import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'
import { AuthProvider } from './UseContext/UserProvider'

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />

        <Outlet />
        <Footer />
      </AuthProvider>

    </>
  )
}

export default App
