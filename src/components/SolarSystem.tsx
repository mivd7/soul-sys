import { FC, Suspense, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { CubeTextureLoader, Group, Object3DEventMap } from "three";
import Sphere from "./Sphere";
import Text from "./Text";
import { SolarSystemProps } from "../types";
import { useSceneContext } from "./context/SceneContext";

const loader = new CubeTextureLoader();
const texture = loader.load([
  "assets/backgrounds/front.jpeg",
  "assets/backgrounds/back.jpeg",
  "assets/backgrounds/top.jpeg",
  "assets/backgrounds/bottom.jpeg",
  "assets/backgrounds/left.jpeg",
  "assets/backgrounds/right.jpeg",
]);

const SolarSystem: FC<SolarSystemProps> = ({ data }) => {
  const { scene } = useThree();
  let group = useRef<Group<Object3DEventMap>>(null);
  const { sun } = useSceneContext();
  scene.background = texture;
  return (
    <group ref={group}>
      {data.length > 0 &&
        data.map((body, i) => {
          const angle = (i * Math.PI * 2) / data.length; // Distribute planets in a circle
          const distance = body.semimajorAxis;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;

          return (
            <Suspense key={body.id} fallback="loading">
              <ambientLight intensity={1} />
              <Text
                text={body.englishName}
                position={[x, 0, z]}
                size={body.equaRadius * 0.5}
              />
              <Sphere
                textureUrl={`assets/textures/2k_${body.englishName.toLowerCase()}.jpg`}
                position={[x, 0, z]}
                scale={[1, 1, 1]}
                geometry={[body.equaRadius, undefined, undefined]}
                body={body}
              />
            </Suspense>
          );
        })}
      {sun && (
        <Suspense fallback="loading">
          <Text
            text={sun.englishName}
            position={[0, -200, 0]}
            size={sun.equaRadius * 0.5}
          />
          <Sphere
            textureUrl={`assets/textures/2k_${sun.englishName.toLowerCase()}.jpg`}
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            geometry={[sun.equaRadius, undefined, undefined]}
            body={sun}
          />
        </Suspense>
      )}
    </group>
  );
};

export default SolarSystem;
