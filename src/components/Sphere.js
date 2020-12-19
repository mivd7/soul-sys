import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
const x = getRandomArbitrary(-100, 100);
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const Sphere = ({position, textureUrl, body}) => {
  const mesh = useRef()
  // const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [radius, setRadius] = useState(0);
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  //random position on x vector

  useEffect(() => {
    setRadius(body.meanRadius / 500)
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
      }}
      position={[x, 0, (body.semimajorAxis / 1000000) * -1]}>
      {radius && radius !== 0 && <sphereGeometry attach="geometry" args={[radius, 16, 16]}/>}      
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} opacity={1}/>
    </mesh>
  )
}

export default Sphere;