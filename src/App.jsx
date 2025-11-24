import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';
import Controls from './components/controls/CameraControls';
import SolarSystem from './components/SolarSystem';
import { useQuery } from '@apollo/client/react';
import { GET_PLANETS } from './queries/getPlanets';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const { loading, error, data } = useQuery(GET_PLANETS);
  const farPoint = useMemo(() => data?.allPlanets.at(data?.allPlanets ?? 0).semimajorAxis ?? 0, [data]);
  console.log('data', data)

  return (
    <ErrorBoundary fallback={<p style={{fontSize: 24, color: 'white'}}>Something went wrong. {error && `${error.name} : ${error.message}`}</p>}>
      <Canvas style={{}} camera={{ position: [0, 0, 5000], fov: 75, near: 1, far: farPoint }}>
        <Controls />
        <directionalLight intensity={1} />
        <ambientLight intensity={0.6} />
        {data?.allPlanets && <SolarSystem data={data.allPlanets ?? []}/>}
      </Canvas>
    </ErrorBoundary>
  );
}

export default App;