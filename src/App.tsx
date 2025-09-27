// src/App.tsx

import '@/assets/styles/global.css';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import MapComponent from './components/map/MapComponent';
import LocateButton from './components/map/LocateButton';
import type { Map as LeafletMap } from 'leaflet';
import FogOfWarCanvas from './components/map/FogOfWarCanvas';

function App() {
  const mapRef = useRef<LeafletMap | null>(null);

  return (
    <div className="w-full h-screen relative">
      <MapComponent />
      <FogOfWarCanvas mapRef={mapRef} radius={30} />
      <LocateButton mapRef={mapRef} />
    </div>
  );
}

export default App;
