import React, { useEffect, useState } from 'react'
import logo from '../assets/img/tweakasix.png'
import axios from "axios";
import './Home.css'

function Home() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth`, { withCredentials: true })
      .then(() => {
        setAuth(true);
      })
      .catch(() => setAuth(false));
  }, []);
  return (
    <div className='home'>
        <h1>Welcome <br/>to</h1>
    <img src={logo} alt="logo" className='logo'/>


    
        </div>
  )
}

export default Home