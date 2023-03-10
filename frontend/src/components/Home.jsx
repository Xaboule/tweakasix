import React, { useEffect, useState } from 'react'
import logo from '../assets/img/tweakasix.png'
import axios from "axios";
import './Home.css'
import Testus from './Test';
// import GlobalDescriptionList from './PlaceHolderDescription';
function Home() {
  // const [auth, setAuth] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/`, { withCredentials: true })
  //     .then(() => {
  //       setAuth(true);
  //     })
  //     .catch(() => setAuth(false));
  // }, []);



  const [keyWordlist, setKeyWordlist] = useState([]);
  const [paramFilter, setParamFilter] = useState('');
  return (
    // <div className='home'>  
    //       <h1>Welcome <br/>to</h1>
    // <img src={logo} alt="logo" className='logo'/>
  
    //     </div>
      <Testus
             keyWordlist={keyWordlist}
             setKeyWordlist={setKeyWordlist}
             paramFilter={paramFilter}
             setParamFilter={'pichette'}
             />


  
  )
}

export default Home