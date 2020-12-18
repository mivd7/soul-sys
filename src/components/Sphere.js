import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'

const Sphere = (props) => {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [radius, setRadius] = useState(0);
  const texture = useLoader(THREE.TextureLoader, 'assets/2k_mars.jpg');

  useEffect(() => {
    setRadius(props.body.meanRadius / 1000)
  }, [props.body])
  
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.0025
  })

  return (  
    <mesh
      ref={mesh}
      scale={[.1, .1, .1]}
      onClick={(event) => {
        console.log('position of ' + props.body.name + ' ' + props.position);
        setActive(!active)
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[radius, 32, 32]} />      
        <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

export default Sphere;