import { CelestialBody } from "./body";

// Type definitions for Planet/Body data
export interface Planet extends CelestialBody {
  id: string;
  englishName: string;
  semimajorAxis: number;
  equaRadius: number;
  meanRadius: number;
  isPlanet: boolean;
  axialTilt: number;
}

export interface ApiResponse {
  allPlanets: Planet[];
}

// Component prop types
export interface SphereProps {
  position: [number, number, number];
  textureUrl: string;
  body: Planet;
  scale: [number, number, number];
  geometry: [number, number, number];
}

export interface TextProps {
  text: string;
  position: [number, number, number];
  size: number;
}

export interface SolarSystemProps {
  data: Planet[];
}

export type TResponseBody<T, K extends string> = {
    data: Record<K, T>
}