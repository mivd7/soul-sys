import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
import Sphere from "./Sphere";
import Text from "./Text";
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

  texture.height = '100vh';
  texture.width = '100vw';
  scene.background = texture;
  const mercury = data[0];
  console.log('mercury', mercury);

  return (
    <group ref={group}>
    {data.length > 0 && sun && data.map((body, i) => {
      const angle = (i * Math.PI * 2) / data.length; // Distribute planets in a circle
      const distance = (sun.equaRadius) + (body.semimajorAxis / 50);
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      
      return (
      <Suspense key={body.id} fallback="loading">
        <Text 
          text={body.englishName} 
          position={[x, -150, z]} 
          size={body.equaRadius * 0.5} 
        />
        <Sphere 
          textureUrl={`assets/textures/2k_${body.englishName.toLowerCase()}.jpg`}
          position={[x, 0, z]} 
          scale={[1, 1, 1]}
          geometry={[body.equaRadius, 50, 50]}
          body={body} />
      </Suspense>
    )})}
    {sun && 
      <Suspense fallback="loading">
        <Text 
          text={sun.englishName} 
          position={[0, -200, 0]} 
          size={sun.equaRadius * 0.5} 
        />
        <Sphere 
          textureUrl={`assets/textures/2k_${sun.englishName.toLowerCase()}.jpg`}
          position={[0,0,0]} 
          scale={[.5, .5, .5]}
          geometry={[sun.equaRadius, 50, 50]}
          body={sun} 
          isCenter={true}/>
      </Suspense>
    }
  </group>
  );
};

export default SolarSystem;