import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import img from '../assets/2k_jupiter.jpg'

const Sphere = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [radius, setRadius] = useState(0);
  const texture = useLoader(THREE.TextureLoader, 'assets/2k_mars.jpg');
  
  useEffect(() => {
    setRadius(props.body.meanRadius / 1000)
  }, [props.body])
  
  // Rotate mesh every frame, this is outside of React without overhead
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
      
        {/* {props.body.id !== 'jupiter' && <meshStandardMaterial color={hovered ? 'red' : 'purple'} />} */}
        <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

export default Sphere;