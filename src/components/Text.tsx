import React, { useRef, useEffect } from 'react';
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import scienceGothic from '../assets/Science Gothic_Regular.json';
import * as THREE from 'three';
import type { TextProps } from '../types';

extend({ TextGeometry });

const Text: React.FC<TextProps> = ({ text = 'Planet', position = [0, 0, 0], size = 80 }) => {
    const font = new FontLoader().parse(scienceGothic);
    const textRef = useRef<THREE.Mesh>(null);
    const boxRef = useRef<THREE.Mesh>(null);
    
    useEffect(() => {
        if (textRef.current) {
            // Center the text
            const box = new THREE.Box3().setFromObject(textRef.current);
            const center = box.getCenter(new THREE.Vector3());
            textRef.current.position.x = -center.x;
            textRef.current.position.z = -center.z;
        }
    }, [text]);

    return (
        <group position={[position[0], position[1] + size * 2, position[2]]}>
            <mesh ref={textRef}>
                <textGeometry args={[text, { 
                    font, 
                    size: size, 
                    height: 2,
                    curveSegments: 12,
                    bevelEnabled: false
                }]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
        </group>
    )
}

export default Text;