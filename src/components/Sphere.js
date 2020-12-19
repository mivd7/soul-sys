import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'

const Sphere = (props) => {
  const mesh = useRef()
  // const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [radius, setRadius] = useState(0);
  const texture = useLoader(THREE.TextureLoader, props.textureUrl);

  useEffect(() => {
    setRadius(props.body.meanRadius / 500)
  }, [props.body])

  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.0025
  })

  return (  
    <mesh
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={(event) => {
        console.log(props.body);
        setActive(!active)
      }}>
      {radius && radius !== 0 && <sphereGeometry args={[radius, 30, 30]} />}      
      <meshBasicMaterial map={texture} toneMapped={false} transparent/>
    </mesh>
  )
}

export default Sphere;