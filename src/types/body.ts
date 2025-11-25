export interface Moon {
  moon: string;
  rel: string;
}

export interface Mass {
  massValue: number;
  massExponent: number;
}

export interface Vol {
  volValue: number;
  volExponent: number;
}

export interface AroundPlanet {
  planet: string;
  rel: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  englishName: string;
  isPlanet: boolean;
  moons?: Moon[];
  // Average distance from the body to the focus of its orbit (usually the star) in kilometers
  semimajorAxis: number;
  // Closest distance to the body from the star in its orbit (perihelion) in kilometers
  perihelion: number;
  // Farthest distance from the body to the star in its orbit (aphelion) in kilometers
  aphelion: number;
  // Orbital eccentricity: 0 = circular orbit, values closer to 1 = more elliptical
  eccentricity: number;
  // Inclination of the orbit relative to the reference plane (degrees)
  inclination: number;
  mass: Mass;
  vol: Vol;
  // Average density of the body (kg/m³)
  density: number;
  // Surface gravity (m/s²)
  gravity: number;
  // Escape velocity from the body's surface (m/s)
  escape: number;
  // Mean radius: average radius calculated from volume (kilometers)
  meanRadius: number;
  // Equatorial radius (kilometers)
  equaRadius: number;
  // Polar radius (kilometers)
  polarRadius: number;
  // Flattening: (equatorial - polar) / equatorial, measures oblateness
  flattening: number;
  // Physical dimensions string (e.g., diameter) when available
  dimension: string;
  // Sidereal orbital period: time to orbit the star relative to fixed stars (days)
  sideralOrbit: number;
  // Sidereal rotation period: rotation period relative to the fixed stars (hours or days depending on source)
  sideralRotation: number;
  aroundPlanet?: AroundPlanet;
  discoveredBy: string;
  discoveryDate: string;
  alternativeName: string;
  // Axial tilt (obliquity) in degrees: angle between rotational axis and orbital plane
  axialTilt: number;
  // Average surface temperature in Kelvin
  avgTemp: number;
  // Mean anomaly at epoch (degrees): position of the body along its orbit at a given time
  mainAnomaly: number;
  // Argument of periapsis (degrees): orientation of the ellipse within the orbital plane
  argPeriapsis: number;
  // Longitude of the ascending node (degrees): orbital plane orientation relative to reference direction
  longAscNode: number;
  bodyType: string;
  rel: string;
}