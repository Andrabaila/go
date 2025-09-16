import leaflet, { Map } from 'leaflet';

// Создаём слой "тумана войны"
function createFogOfWarLayer(map: Map) {
  const bounds = map.getBounds();

  const fog = leaflet.rectangle(bounds, {
    color: '#000',
    weight: 0,
    fillOpacity: 0.6, // прозрачность тумана
  });

  fog.addTo(map);

  return fog;
}

export default createFogOfWarLayer;
