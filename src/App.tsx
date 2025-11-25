import { Suspense } from 'react';
import './App.css';
import { useQuery } from '@apollo/client/react';
import { GET_PLANETS } from './queries/getPlanets';
import { SceneProvider } from './components/context/SceneContext';
import Scene from './components/Scene';
import type { ApiResponse } from './types';

function App(): JSX.Element {
  const { loading, error, data } = useQuery<ApiResponse>(GET_PLANETS);

  return (
    <Suspense fallback={<p style={{fontSize: 24, color: 'white'}}>Something went wrong. {error && `${error.name} : ${error.message}`}</p>}>
      <SceneProvider>
        {data && <Scene data={data}/>}
      </SceneProvider>  
    </Suspense>
  );
}

export default App;