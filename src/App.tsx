// src/App.tsx

import '@/assets/styles/global.css';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import MapComponent from './components/map/MapComponent';
import LocateButton from './components/map/LocateButton';
import type { Map as LeafletMap } from 'leaflet';

function App() {
  const mapRef = useRef<LeafletMap | null>(null);

  return (
    <div className="w-full h-screen relative">
      <MapComponent mapRef={mapRef} />
      <LocateButton mapRef={mapRef} />
    </div>
  );
}

export default App;
