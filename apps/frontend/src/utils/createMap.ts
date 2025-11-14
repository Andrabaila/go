import leaflet, { Map } from 'leaflet';

function createMap(
  container: HTMLDivElement,
  center: [number, number],
  zoom: number
): Map {
  return leaflet.map(container).setView(center, zoom);
}

export default createMap;
