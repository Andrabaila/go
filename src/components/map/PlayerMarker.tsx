// src/components/map/PlayerMarker.tsx
import { Marker, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { LatLngExpression } from 'leaflet';

interface Props {
  position: LatLngExpression | null;
  follow: boolean;
}

export default function PlayerMarker({ position, follow }: Props) {
  const map = useMap();

  useEffect(() => {
    if (position && follow) {
      map.setView(position, map.getZoom());
    }
  }, [position, follow, map]);

  if (!position) return null;
  return <Marker position={position} />;
}
