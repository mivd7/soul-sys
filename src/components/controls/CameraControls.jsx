import React, { useRef } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

extend({ FlyControls });
function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();  
  camera.position.set( 0, 0, 999 );
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.update(delta)
  })
  return <flyControls 
            ref={ref} 
            args={[camera, domElement]} 
            movementSpeed={10000} 
            domElement={domElement}
            rollSpeed={Math.PI / 24}
            autoForward={false}
            dragToLook={true} />
}

export default Controls;