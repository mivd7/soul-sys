import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import {getRandomArbitrary, computeProjectedRadius} from '../lib/helpers';

const x = getRandomArbitrary(-100, 100);

const Sphere = ({position, textureUrl, body, isCenter}) => {
  const mesh = useRef()
  const [active, setActive] = useState(false)
  const [radius, setRadius] = useState(0);
  const [zCoords, setZCoords] = useState((body.semimajorAxis / 1000000));
  
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  useEffect(() => {
    const distance = body.semimajorAxis / 1000000;
    const scaledRadius = body.meanRadius / 100
    // const computedRadius = computeProjectedRadius(3, distance, scaledRadius)
    // console.log('calculated distance ' + body.englishName, distance);
    if(isCenter) {
      setRadius(body.meanRadius / 1000)
      setZCoords(0)
    } else {
      setRadius(body.meanRadius / 10)
      setZCoords(body.semimajorAxis / 10000)
    }
    
    
  }, [body, isCenter])
  
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
      position={[0, 0, zCoords]}>
      {radius && radius !== 0 && <sphereGeometry attach="geometry" args={[radius, 32, 32]}/>}      
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} opacity={1}/>
    </mesh>
  )
}

export default Sphere;