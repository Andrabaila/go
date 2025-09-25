import { Polygon } from 'react-leaflet';
import { latLng, latLngBounds } from 'leaflet';

interface Props {
  position: [number, number];
  radius?: number; // радиус в метрах
}

export default function FogOfWar({ position, radius = 30 }: Props) {
  if (!position) return null;

  const bounds = latLngBounds(latLng(-90, -180), latLng(90, 180));

  const steps = 64;
  const lat = position[0];
  const lng = position[1];
  const circlePoints: [number, number][] = [];

  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    const dx = (radius / 111320) * Math.cos(angle); // широта
    const dy =
      (radius / (111320 * Math.cos((lat * Math.PI) / 180))) * Math.sin(angle); // долгота
    circlePoints.push([lat + dx, lng + dy]);
  }

  // Полигон с дыркой
  const polygon: [number, number][][] = [
    [
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getSouthWest().lat, bounds.getNorthEast().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
      [bounds.getNorthEast().lat, bounds.getSouthWest().lng],
    ],
    circlePoints.reverse(),
  ];

  return (
    <Polygon
      positions={polygon}
      pathOptions={{
        fillColor: '#000',
        fillOpacity: 0.5,
        color: '#000',
        weight: 0,
        fillRule: 'evenodd',
      }}
    />
  );
}
