import React, { useEffect, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import type { SphereProps } from '../types';

const Sphere: React.FC<SphereProps> = ({ position, textureUrl, body, scale, geometry }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  
  useEffect(() => {
    if (mesh.current) {
      const axis = new THREE.Vector3(0, 0, 0);
      mesh.current.rotateOnAxis(axis, body.axialTilt);
      // mesh.current.color = '#000000'; // This property doesn't exist on Mesh
    }
  }, [mesh, body.axialTilt]);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0025;
    }
  });

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