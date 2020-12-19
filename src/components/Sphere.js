import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'

const Sphere = ({position, textureUrl, body}) => {
  const mesh = useRef()
  // const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [radius, setRadius] = useState(0);
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useEffect(() => {
    setRadius(body.meanRadius / 1000)
  }, [body])

  useFrame(() => {
    
    mesh.current.rotation.y = mesh.current.rotation.y += .0025;
  })

  return (  
    <mesh
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={(event) => {
        console.log(body);
        setActive(!active)
      }}>
      {radius && radius !== 0 && <sphereGeometry args={[radius, 30, 30]} />}      
      <meshBasicMaterial map={texture} toneMapped={false} opacity={1}/>
    </mesh>
  )
}

export default Sphere;