import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
import Sphere from "./Sphere";
import Axios from "axios";
import { GET_BODY } from "../queries/getBody";
import { useQuery } from "@apollo/client/react";

const SolarSystem = ({data}) => {
  const { scene } = useThree();
  let group = useRef();
  const { data: sunData } = useQuery(GET_BODY, {
    variables: {
      id: 'soleil'
    },
    pollInterval: 0
  })

  const sun = useMemo(() => sunData?.body, [sunData])
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
          position={[0, 0, body.semimajorAxis / 100]} 
          scale={[1, 1, 1]}
          geometry={[body.equaRadius, 50, 50]}
          body={body} />
      </Suspense>
    ))}
    {sun && 
      <Suspense fallback="loading">
        <Sphere 
          textureUrl={`assets/textures/2k_${sun.englishName.toLowerCase()}.jpg`}
          position={[0,0,0]} 
          scale={[.1, .1, .1]}
          geometry={[sun.equaRadius, 50, 50]}
          body={sun} 
          isCenter={true}/>
      </Suspense>
    }
  </group>
  );
};

export default SolarSystem;