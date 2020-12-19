import { Suspense, useRef } from "react";
import { useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";
import Sphere from "./Sphere";

// Loads the skybox texture and applies it to the scene.
const SolarSystem = ({data}) => {
  const { scene } = useThree();
  let group = useRef()
  const coords = new Array(data.length).fill().map(i => [Math.random() * 8 - 4, Math.random() * 8 - 4, Math.random() * 8 - 4])
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "assets/backgrounds/front.jpeg",
    "assets/backgrounds/back.jpeg",
    "assets/backgrounds/top.jpeg",
    "assets/backgrounds/bottom.jpeg",
    "assets/backgrounds/left.jpeg",
    "assets/backgrounds/right.jpeg",
  ]);

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
  </group>
  );
};

export default SolarSystem;