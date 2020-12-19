import { Suspense, useEffect, useRef, useState } from "react";
import { useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";
import Sphere from "./Sphere";
import { BASE_URL } from '../constants';
import Axios from "axios";

const SolarSystem = ({data}) => {
  const [sun, setSun] = useState(null)
  const { scene } = useThree();
  let group = useRef();

  const coords = new Array(data.length).fill().map(i => [Math.random() * 80 - 4, Math.random() * 8 - 4, Math.random() * 8 - 4])
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "assets/backgrounds/front.jpeg",
    "assets/backgrounds/back.jpeg",
    "assets/backgrounds/top.jpeg",
    "assets/backgrounds/bottom.jpeg",
    "assets/backgrounds/left.jpeg",
    "assets/backgrounds/right.jpeg",
  ]);

  useEffect(() => {
    async function getSun() {
      await Axios.get(`${BASE_URL}/soleil`)
                 .then(response => setSun(response.data))
                 .catch(err => console.error(err))
    }
    getSun();
  }, [])
  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return (
    <group ref={group}>
    {coords.length > 0 && coords.map((c, i) => (
      <Suspense key={data[i].id} fallback="loading">
        <Sphere 
          textureUrl={`assets/textures/2k_${data[i].englishName.toLowerCase()}.jpg`}
          position={c} 
          body={data[i]} />
      </Suspense>
    ))}
    {sun && 
      <Suspense fallback="loading">
        <Sphere 
          textureUrl={`assets/textures/2k_${sun.englishName.toLowerCase()}.jpg`}
          position={[0,0,0]} 
          body={sun} 
          isCenter={true}/>
      </Suspense>
    }
  </group>
  );
};

export default SolarSystem;