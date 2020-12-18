import { useLoader } from "react-three-fiber";
export const loadTexture = (textureImg) => {
  let texture = useLoader(THREE.TextureLoader, textureImg);
  return texture;
}
