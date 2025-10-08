import '@/assets/styles/global.css';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { MapComponent, LocateButton } from '@/components';
import type { Map as LeafletMap } from 'leaflet';

function App() {
  const mapRef = useRef<LeafletMap | null>(null);

  return (
    <div className="w-full h-screen relative">
      {/* Прокидываем mapRef */}
      <MapComponent mapRef={mapRef} />
      <LocateButton mapRef={mapRef} />
    </div>
  );
}

export default App;
