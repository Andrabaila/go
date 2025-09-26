import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';

interface Props {
  mapRef: React.RefObject<LeafletMap | null>;
  radius?: number; // метров
}

export default function FogOfWarCanvas({ mapRef, radius = 30 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const map = mapRef.current;
    const canvas = canvasRef.current;
    if (!map || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const size = map.getSize();
      canvas.width = size.x;
      canvas.height = size.y;

      ctx.clearRect(0, 0, size.x, size.y);

      // тёмная маска
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, size.x, size.y);

      // получаем координаты игрока в пикселях
      const playerLatLng = map.getCenter(); // временно центр карты
      const playerPoint = map.latLngToContainerPoint(playerLatLng);

      // радиус в пикселях
      const metersPerPixel =
        (40075016.686 * Math.cos((playerLatLng.lat * Math.PI) / 180)) /
        Math.pow(2, map.getZoom() + 8);
      const radiusPx = radius / metersPerPixel;

      // вырезаем круг
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(playerPoint.x, playerPoint.y, radiusPx, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    draw();
    map.on('move zoom resize', draw);

    return () => {
      map.off('move zoom resize', draw);
    };
  }, [mapRef, radius]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    />
  );
}
