import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'

const Sphere = ({position, textureUrl, body}) => {
  const mesh = useRef()
  // const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [radius, setRadius] = useState(0);
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    setRadius(body.meanRadius / 10)
  }, [body])
  console.log('semimajorAxis for ' + body.englishName, body.semimajorAxis)
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
      position={[0, 0, (body.semimajorAxis / 10000000) * -1]}>
      {radius && radius !== 0 && <sphereGeometry attach="geometry" args={[1, 16, 16]}/>}      
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} opacity={1}/>
    </mesh>
  )
}

export default Sphere;