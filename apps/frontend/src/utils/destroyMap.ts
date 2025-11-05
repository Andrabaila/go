import { Map } from 'leaflet';

function destroyMap(map: Map) {
  map.remove();
}

export default destroyMap;
