import React, { useRef, Suspense } from 'react'
import Sphere from './Sphere';

const Planets = ({data}) => {
  let group = useRef()

  return (
    <group ref={group}>
      {data.length > 0 && data.map(planet => (
        <Suspense key={planet.id} fallback="loading">
          <Sphere 
            textureUrl={`assets/2k_${planet.englishName.toLowerCase()}.jpg`}
            position={[Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400]} 
            body={planet} />
        </Suspense>
      ))}
    </group>
  )
}

export default Planets;