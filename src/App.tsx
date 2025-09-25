// src/App.tsx

import '@/assets/styles/global.css';
import 'leaflet/dist/leaflet.css';

import MapComponent from './components/map/MapComponent';

function App() {
  return (
    <div className="w-full h-screen">
      <MapComponent />
    </div>
  );
}

export default App;
