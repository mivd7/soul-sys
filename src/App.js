import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
// import Stars from './components/Stars'
import Controls from './components/controls/CameraControls';
import SolarSystem from './components/SolarSystem';
import { BASE_URL } from './constants';

function App() {
  const [bodies, setBodies] = useState([])
  const [planets, setPlanets] = useState([])

  useEffect(() => {
    async function fetchPlanets() {
      await Axios.get(`${BASE_URL}?order=semimajorAxis%2Cdesc`)
                 .then(response => {
                   setBodies(response.data.bodies)
                 })
                 .catch(err => console.error(err))
    }
    fetchPlanets();
  }, [])

  useEffect(() => {
    if(bodies.length > 0) {
      const filtered = bodies.filter(body => body.isPlanet)
      setPlanets(filtered);
    }
  }, [bodies])
 
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
      <Controls />
      <directionalLight intensity={1} />
      <ambientLight intensity={0.6} />
      <SolarSystem data={planets}/>
      {/* <Stars planets={planets}/> */}
    </Canvas>
  );
}

export default App;
