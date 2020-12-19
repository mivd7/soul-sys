import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import {getRandomArbitrary} from '../lib/helpers';

const Sphere = ({position, textureUrl, body, isCenter}) => {
  const mesh = useRef()
  const [active, setActive] = useState(false)
  const [radius, setRadius] = useState(0);
  const [zCoords, setZCoords] = useState((body.semimajorAxis / 1000000));
  const [scaleFactor, setScaleFactor] = useState([]);
  
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useEffect(() => {
    if(isCenter) {
      setRadius(body.meanRadius)
      setZCoords(0)
      setScaleFactor([.0005, .0005, .0005])
    } else {
      setRadius(body.meanRadius)
      setZCoords(body.semimajorAxis / 50000)
      setScaleFactor([.01, .01, .01])
    }
  }, [body, isCenter])
  
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += .0025;
  })

  return (  
    <mesh
      ref={mesh}
      scale={scaleFactor}
      onClick={(event) => {
        console.log(body);
        setActive(!active)
      }}
      position={[0, 0, zCoords * -1]}>
      {radius && radius !== 0 && <sphereGeometry attach="geometry" args={[radius, 32, 32]}/>}      
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} opacity={1}/>
    </mesh>
  )
}

export default Sphere;