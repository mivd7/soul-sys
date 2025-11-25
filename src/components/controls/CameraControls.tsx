import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { FlyControls } from "@react-three/drei";

function Controls() {
  const {
    camera,
    gl: { domElement  },
  } = useThree();  
  const ref = useRef<any>(null)
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.update(delta)
    }
  })
  
  return (
    <FlyControls 
      ref={ref} 
      args={[camera, domElement]} 
      movementSpeed={100000} 
      domElement={domElement}
      rollSpeed={Math.PI / 12}
      autoForward={false}
      dragToLook
    />
  )
}

export default Controls;