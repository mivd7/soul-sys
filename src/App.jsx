import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';
import Controls from './components/controls/CameraControls';
import SolarSystem from './components/SolarSystem';
import { useQuery } from '@apollo/client/react';
import { GET_PLANETS } from './queries/getPlanets';

function App() {
  const { loading, error, data } = useQuery(GET_PLANETS);
  if(error) {
    return <p style={{color: 'red'}}>{JSON.stringify(error)}</p>
  }

  const farPoint = useMemo(() => data?.allPlanets.at(data?.allPlanets ?? 0).semimajorAxis ?? 0, [data]);
  console.log('data', data)

  return (
    <Canvas style={{}} camera={{ position: [0, 0, 1], fov: 8000, far: farPoint }}>
      <Controls />
      <directionalLight intensity={1} />
      <ambientLight intensity={0.6} />
      {data?.allPlanets && <SolarSystem data={data.allPlanets ?? []}/>}
    </Canvas>
  );
}

export default App;
