import React, { useEffect, useState } from 'react'
import logo from '../assets/img/tweakasix.png'
import axios from "axios";
import './Home.css'

// import GlobalDescriptionList from './PlaceHolderDescription';
function Home() {
  const [auth, setAuth] = useState('false');
  const [backendTechnos, setbackendTechnos] = useState();

  const fetchBackendTechnosData = () => {
    axios
      .get(`http://localhost:3001/agencies/`)
      .then((data) => setbackendTechnos(data.data));
  };

  useEffect(() => {
    // axios
    //   .get(`http://localhost:3001/`, { withCredentials: true })
    //   .then(() => {
    //     setAuth('true');
    //   })
    //   .catch(() => setAuth('false'));
          fetchBackendTechnosData()
 
      }, []);

      // console.log(backendTechnos)


  const [keyWordlist, setKeyWordlist] = useState([]);
  const [paramFilter, setParamFilter] = useState('');
  return (
    <div className='home'>  
          <h1>Welcome <br/>to</h1>
    {/* <img src={logo} alt="logo" className='logo'/> */}
    {backendTechnos && (backendTechnos.map((e) =><div>{e.city}</div>))}
  
        </div>


  
  )
}

export default Home