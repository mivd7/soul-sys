import { Canvas, useThree } from "@react-three/fiber";
import { FC, useMemo } from "react";
import Controls from "./controls/CameraControls";
import SolarSystem from "./SolarSystem";
import { useSceneContext } from "./context/SceneContext";
import { Planet } from "../types";
import { centralPoint } from "../constants";
interface SceneProps {
  data?: {
    allPlanets: Planet[];
  };
}

const sunLuminosity = 25;
const Scene: FC<SceneProps> = ({}) => {
  const { sun, planets, ...x } = useSceneContext();
  const farPoint = useMemo(
    () => planets?.at(planets.length - 1)?.semimajorAxis ?? 0,
    [planets]
  );
  console.log("useScene result", x);
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{
        position: [0, 0, 149598023],
        fov: 75,
        near: 1,
        far: farPoint,
      }}
    >
      <Controls />
      {sun && (
        <ambientLight
          intensity={sunLuminosity}
          position={centralPoint}
          scale={sun?.equaRadius}
        />
      )}
      {planets && <SolarSystem data={planets} />}
    </Canvas>
  );
};

export default Scene;
