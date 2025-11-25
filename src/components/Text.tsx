import React from 'react';
import { Text as DreiText } from '@react-three/drei';
import type { TextProps } from '../types';

const Text: React.FC<TextProps> = ({ text = 'Planet', position = [0, 0, 0], size = 80 }) => {
    return (
        <group position={[position[0], position[1] + size * 2, position[2]]}>
            {/* Background box */}
            {/* <mesh position={[0, 0, -10]}>
                <boxGeometry args={[text.length * size * 0.6, size * 1.2, 5]} />
                <meshBasicMaterial 
                    color="#000000" 
                    transparent 
                    opacity={0.7} 
                />
            </mesh> */}
            
            {/* Text using Drei */}
            <DreiText
                fontSize={size}
                color="white"
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0]}
            >
                {text}
            </DreiText>
        </group>
    );
}

export default Text;