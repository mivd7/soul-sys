import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
import Sphere from './components/Sphere'
import Stars from './components/Stars'
import Planets from './components/Planets'
import CameraControls from './components/controls/CameraControls';


function App() {
  const [bodies, setBodies] = useState([])
  const [planets, setPlanets] = useState([])

  useEffect(() => {
    async function fetchPlanets() {
      await Axios.get('https://api.le-systeme-solaire.net/rest.php/bodies?order=semimajorAxis%2Casc&filter%5B%5D=isPlanet%2Ceq%false')
                 .then(response => {
                   setBodies(response.data.bodies)
                 })
                 .catch(err => console.error(err))
    }
    fetchPlanets();
  }, [])

  useEffect(() => {
    if(bodies.length > 0) {
      const filtered = bodies.filter(body => {
        return body.isPlanet === true
      })
      setPlanets(filtered);
    }
  }, [bodies])
 
  return (
    <Canvas>
      <CameraControls />
      <directionalLight intensity={1} />
      <ambientLight intensity={0.6} />
      {/* <Planets data={planets}/> */}
      <Stars planets={planets}/>
    </Canvas>
  );
}

export default App;
