import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'

const Sphere = ({position, textureUrl, body, scale, geometry}) => {
  const mesh = useRef()
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += .0025;
  })

  return (  
    <mesh
      ref={mesh}
      scale={scale}
      onClick={(event) => {
        console.log(body);
      }}
      position={position}>
      <sphereGeometry attach="geometry" args={geometry}/>     
      <meshBasicMaterial attach="material" map={texture} toneMapped={false}/>
    </mesh>
  )
}

export default Sphere;