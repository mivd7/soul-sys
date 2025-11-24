import React, { useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Sphere = ({position, textureUrl, body, scale, geometry}) => {
  const mesh = useRef()
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  
  useEffect(() => {
    const axis = new THREE.Vector3(0,0,0)
    mesh.current.rotateOnAxis(axis, body.axialTilt);
    mesh.current.color = '#000000';
  }, [mesh, body.tilt]);
  
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
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}

export default Sphere;