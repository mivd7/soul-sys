import React, { useRef, useMemo } from 'react'
///src/Three
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber'
import Planets from './Planets';

const Stars = ({planets}) => {
  let group = useRef()

  const [geo, mat, vertices, coords] = useMemo(() => {
    const vertices = [[-1, 0, 0], [0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0]];
    const geo = new THREE.SphereBufferGeometry(1, 10, 10)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('lightblue') })
    const coords = new Array(2000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
    return [geo, mat, vertices, coords]
  }, [])
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
      <Planets data={planets}/>
    </group>
  )
}

export default Stars;