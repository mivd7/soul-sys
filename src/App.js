import Axios from 'axios';
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { Html } from "drei"

import './App.css';
import Controls from './components/controls/CameraControls';
import SolarSystem from './components/celestial/SolarSystem';
import Fallback from './components/reusables/Fallback';
import { BASE_URL } from './constants';


function App() {
  const [bodies, setBodies] = useState([])
  const [planets, setPlanets] = useState([])
  const [farPoint, setFarPoint] = useState(0);
  const [highPoint, setHighPoint] = useState(0);

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
      const filtered = bodies.filter(body => body.isPlanet);
      setPlanets(filtered);
      setFarPoint(bodies[bodies.length - 1].semimajorAxis);
    }
  }, [bodies])

  return (<>
    <div id="info">3d Solar Sys - earth [fly controls]<br/>
      <b>WASD</b> move, <b>R|F</b> up | down, <b>Q|E</b> roll, <b>up|down</b> pitch, <b>left|right</b> yaw
    </div> 
    <Canvas camera={{ position: [0, 0, 10], fov: 8000, far: farPoint }}>
      <Controls />
      <directionalLight intensity={1} />
      <ambientLight intensity={0.6} />
      <Suspense fallback={<Fallback/>}>
        <SolarSystem data={planets}/>
      </Suspense>
    </Canvas>
    </>
  );
}

export default App;
