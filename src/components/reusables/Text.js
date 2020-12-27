import React, { useEffect, useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { HTML } from 'drei';

const Text = ({ content }) => {
  return(
    <HTML scaleFactor={10000}>
          <div className="content">
            {content}
          </div>
        </HTML>
  )
};

export default Text;