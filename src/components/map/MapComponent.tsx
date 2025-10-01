import { useState, useMemo, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';

import { ObjectLayer, ObjectFilterPanel } from '@/components';
import geoJsonData from '@/assets/data/osmData.json';
import type { MapFeatureCollection } from '@/types';

interface Props {
  mapRef: React.RefObject<LeafletMap | null>;
}

export default function MapComponent({ mapRef }: Props) {
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    (geoJsonData as MapFeatureCollection).features.forEach((f) => {
      if (f.properties.type) types.add(f.properties.type);
    });
    return Array.from(types);
  }, []);

  const [filter, setFilter] = useState<string[]>(availableTypes);

  const toggleType = (type: string) => {
    setFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // создаём локальный ref для MapContainer
  const internalMapRef = useRef<LeafletMap>(null);

  return (
    <div style={{ position: 'relative' }}>
      <ObjectFilterPanel
        availableTypes={availableTypes}
        selectedTypes={filter}
        onToggle={toggleType}
      />

      <MapContainer
        center={[52.1506, 21.0336]}
        zoom={17}
        style={{ width: '100%', height: '100vh' }}
        ref={(mapInstance: LeafletMap) => {
          mapRef.current = mapInstance; // прокидываем наружу
          internalMapRef.current = mapInstance; // для внутреннего использования
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ObjectLayer
          data={geoJsonData as MapFeatureCollection}
          filterTypes={filter}
        />
      </MapContainer>
    </div>
  );
}
