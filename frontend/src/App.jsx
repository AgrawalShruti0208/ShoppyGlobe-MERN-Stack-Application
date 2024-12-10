import './App.css'

import { Header } from './components/Header'
import {Outlet} from "react-router-dom"

import { isTokenExpired } from './utils/HelperFunctions';


function App() {
  
    const jwtToken = localStorage.getItem("token");

    if(jwtToken){
        

        if(isTokenExpired(jwtToken)){
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            location.reload();
            
        }
    
    }
    
  return (
    <>
     
      <Header  />
      <Outlet />
      
          
        
      
    </>
  )
}

export default App
