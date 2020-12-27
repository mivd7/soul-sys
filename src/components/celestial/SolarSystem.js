import { useEffect, useRef, useState } from "react";
import { useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";
import Sphere from "../reusables/Sphere";
import { BASE_URL } from '../../constants';
import Axios from "axios";
import PlanetarySystem from "./PlanetarySystem";

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
      <PlanetarySystem key={body.id} body={body}/>
    ))}
    {centralPoint && 
        <Sphere 
          textureUrl={`assets/textures/2k_${centralPoint.englishName.toLowerCase()}.jpg`}
          position={[0,0,0]} 
          scale={[.1, .1, .1]}
          geometry={[centralPoint.meanRadius, 50, 50]}
          body={centralPoint} 
          isCenter={true}/>
    }
  </group>
  );
};

export default SolarSystem;