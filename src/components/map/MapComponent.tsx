import { MapContainer, TileLayer } from 'react-leaflet';

function MapComponent() {
  return (
    <MapContainer
      center={[52.1506, 21.0336]} // Stary Imielin, Warsaw
      zoom={15}
      style={{ width: '100%', height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MapComponent;
