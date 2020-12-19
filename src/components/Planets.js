import React, { useRef, Suspense } from 'react'
import Sphere from './Sphere';

const Planets = ({data}) => {
  let group = useRef()
  const coords = new Array(data.length).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
  return (
    <group ref={group}>
      {coords.length > 0 && coords.map((c, i) => (
        <Suspense key={data[i].id} fallback="loading">
          <Sphere 
            textureUrl={`assets/2k_${data[i].englishName.toLowerCase()}.jpg`}
            position={c} 
            body={data[i]} />
        </Suspense>
      ))}
    </group>
  )
}

export default Planets;