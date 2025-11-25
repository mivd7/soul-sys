import { Canvas } from "@react-three/fiber";
import { FC, useMemo } from "react";
import Controls from "./controls/CameraControls";
import SolarSystem from "./SolarSystem";
import { useScene } from "./context/SceneContext";
import { Planet } from "../types";
interface SceneProps {
    data?: {
        allPlanets: Planet[];
    }
}
const Scene: FC<SceneProps> = ({data}) => {
    const farPoint = useMemo(() => data?.allPlanets.at(data.allPlanets.length - 1)?.semimajorAxis ?? 0, [data]);
    const x = useScene();
    console.log('useScene result', x);
    return(
        <Canvas camera={{ position: [0, 0, 149598023], fov: 75, near: 1, far: farPoint }}>
            <Controls />
            <directionalLight intensity={1} />
            <ambientLight intensity={0.6} />
            {data?.allPlanets && <SolarSystem data={data.allPlanets ?? []}/>}
        </Canvas>
    )
}

export default Scene