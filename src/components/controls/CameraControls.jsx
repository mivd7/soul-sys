import React, { useRef } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

extend({ FlyControls });
function Controls() {
  const {
    camera,
    gl: { domElement  },
  } = useThree();  
  const ref = useRef()
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.update(delta)
    }
  })
  
  return (
    <flyControls 
      ref={ref} 
      args={[camera, domElement]} 
      movementSpeed={500000} 
      domElement={domElement}
      rollSpeed={Math.PI / 12}
      autoForward={false}
      dragToLook={true} 
    />
  )
}

export default Controls;