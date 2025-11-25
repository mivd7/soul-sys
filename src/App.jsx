import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';
import Controls from './components/controls/CameraControls';
import SolarSystem from './components/SolarSystem';
import { useQuery } from '@apollo/client/react';
import { GET_PLANETS } from './queries/getPlanets';
import ErrorBoundary from './components/ErrorBoundary';
import { SceneProvider } from './components/context/SceneContext';
import Scene from './components/Scene';

function App() {
  const { loading, error, data } = useQuery(GET_PLANETS);
  console.log('data', data)

  return (
    <Suspense loading={<p>loading...</p>} fallback={<p style={{fontSize: 24, color: 'white'}}>Something went wrong. {error && `${error.name} : ${error.message}`}</p>}>
      <SceneProvider>
        <Scene data={data}/>
      </SceneProvider>  
    </Suspense>
  );
}

export default App;