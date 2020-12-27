import { 
  Suspense, 
  // useEffect, useRef, useState 
} from "react";
// import { useThree } from "react-three-fiber";
// import { CubeTextureLoader } from "three";
import Sphere from "../reusables/Sphere";
// import { BASE_URL } from '../../constants';
// import Axios from "axios";

const PlanetarySystem = ({body}) => {
  //add in moons
 return(
  <Suspense key={body.id} fallback="loading">
    <Sphere 
      textureUrl={`assets/textures/2k_${body.englishName.toLowerCase()}.jpg`}
      position={[0, 0, body.semimajorAxis * -1]} 
      scale={[1, 1, 1]}
      geometry={[body.meanRadius, 50, 50]}
      body={body} />
  </Suspense>
 )
}

export default PlanetarySystem;