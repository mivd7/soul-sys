import React, { useRef, Suspense } from 'react'
import Sphere from './Sphere';

const Planets = ({data}) => {
  let group = useRef()
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return (
    <group ref={group}>
      {data.length > 0 && data.map(planet => (
        <Suspense key={planet.id} fallback="loading">
          <Sphere 
            textureUrl={`assets/2k_${planet.englishName.toLowerCase()}.jpg`}
            position={[getRandomInt(-5, 5), getRandomInt(-5, 5), getRandomInt(-5, 5)]} 
            body={planet} />
        </Suspense>
      ))}
    </group>
  )
}

export default Planets;