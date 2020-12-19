import { Suspense, useEffect, useRef, useState } from "react";
import { useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";
import Sphere from "./Sphere";
import { BASE_URL } from '../constants';
import Axios from "axios";

const SolarSystem = ({data}) => {
  const [centralPoint, setCentralPoint] = useState(null)
  const { scene } = useThree();
  let group = useRef();

  useEffect(() => {
    if(!centralPoint) {
      async function getSun() {
        await Axios.get(`${BASE_URL}/soleil`)
                   .then(response => setCentralPoint(response.data))
                   .catch(err => console.error(err))
      }
      getSun();
    }
  }, [centralPoint]);

  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "assets/backgrounds/front.jpeg",
    "assets/backgrounds/back.jpeg",
    "assets/backgrounds/top.jpeg",
    "assets/backgrounds/bottom.jpeg",
    "assets/backgrounds/left.jpeg",
    "assets/backgrounds/right.jpeg",
  ]);
  scene.background = texture;

  return (
    <group ref={group}>
    {data.length > 0 && data.map((body, i) => (
      <Suspense key={body.id} fallback="loading">
        <Sphere 
          textureUrl={`assets/textures/2k_${body.englishName.toLowerCase()}.jpg`}
          position={[0, 0, (body.semimajorAxis / 50000) * -1]} 
          scale={[.01, .01, .01]}
          geometry={[body.meanRadius, 50, 50]}
          body={body} />
      </Suspense>
    ))}
    {centralPoint && 
      <Suspense fallback="loading">
        <Sphere 
          textureUrl={`assets/textures/2k_${centralPoint.englishName.toLowerCase()}.jpg`}
          position={[0,0,0]} 
          scale={[.0005, .0005, .0005]}
          geometry={[centralPoint.meanRadius, 50, 50]}
          body={centralPoint} 
          isCenter={true}/>
      </Suspense>
    }
  </group>
  );
};

export default SolarSystem;