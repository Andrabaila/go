import { useRef } from 'react';
import useInitMap from '@/hooks/useInitMap';

function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null!);

  // Инициализируем карту через хук
  useInitMap(mapRef);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
}

export default MapComponent;
