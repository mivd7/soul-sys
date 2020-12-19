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
    {data.length > 0 && data.map((planet, i) => (
      <Suspense key={planet.id} fallback="loading">
        <Sphere 
          textureUrl={`assets/textures/2k_${planet.englishName.toLowerCase()}.jpg`}
          position={[0, 0, (planet.semimajorAxis / 50000) * -1]} 
          scale={[.01, .01, .01]}
          geometry={[planet.meanRadius, 50, 50]}
          body={planet} />
      </Suspense>
    ))}
    {sun && 
      <Suspense fallback="loading">
        <Sphere 
          textureUrl={`assets/textures/2k_${sun.englishName.toLowerCase()}.jpg`}
          position={[0,0,0]} 
          scale={[.0005, .0005, .0005]}
          geometry={[sun.meanRadius, 50, 50]}
          body={sun} 
          isCenter={true}/>
      </Suspense>
    }
  </group>
  );
};

export default SolarSystem;