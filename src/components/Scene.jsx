import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import Controls from "./controls/CameraControls";
import SolarSystem from "./SolarSystem";
import { useScene } from "./context/SceneContext";

const Scene = ({data}) => {
    const farPoint = useMemo(() => data?.allPlanets.at(data?.allPlanets ?? 0).semimajorAxis ?? 0, [data]);
    const x = useScene();
    console.log('hallo!', x);
    return(
        <Canvas camera={{ position: [0, 0, 5000], fov: 75, near: 1, far: farPoint }}>
            <Controls />
            <directionalLight intensity={1} />
            <ambientLight intensity={0.6} />
            {data?.allPlanets && <SolarSystem data={data.allPlanets ?? []}/>}
        </Canvas>
    )
}

export default Scene