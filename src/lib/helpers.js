export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function computeProjectedRadius(fovy, d, r) {
  var fov;
  fov = fovy / 2 * Math.PI / 180.0;

  return 1.0 / Math.tan(fov) * r / Math.sqrt(d * d - r * r);
}
