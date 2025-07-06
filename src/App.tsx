 
import './App.css'
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import { Outlet } from 'react-router'
function App() {
  
  return (
    <>
   <NavBar></NavBar>
   <div className='container mx-auto px-4 py-8'>
    <Outlet></Outlet>

   </div>
   <Footer></Footer>
  
    
    </>
  )
}

export default App
