import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { useState } from 'react';
import FogOfWar from './FogOfWar';

interface Props {
  mapRef: React.RefObject<LeafletMap | null>;
}

function PlayerPosition({
  setPosition,
}: {
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    locationfound(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapComponent({ mapRef }: Props) {
  const [playerPosition, setPlayerPosition] = useState<[number, number] | null>(
    null
  );

  return (
    <MapContainer
      center={[52.1506, 21.0336]}
      zoom={15}
      style={{ width: '100%', height: '100vh' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {playerPosition && <Marker position={playerPosition} />}
      {playerPosition && <FogOfWar position={playerPosition} radius={30} />}
      <PlayerPosition setPosition={setPlayerPosition} />
    </MapContainer>
  );
}
