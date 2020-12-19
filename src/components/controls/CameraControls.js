import React, { useRef } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();

  // camera.position.z = 999;
  camera.position.set( 0, 0, 9 );
  useFrame(() => controls.current.update());
  // domElement.addEventListener( 'mousewheel', (event) => {
  //   console.log('mousewheel event')
  //   camera.position.z +=event.deltaY/500;
  // });

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={false}
      enableZoom={true}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

export default CameraControls;
