import { createPortal } from 'react-dom';
import type { Map as LeafletMap } from 'leaflet';

interface Props {
  mapRef: React.RefObject<LeafletMap | null>;
}

export default function LocateButton({ mapRef }: Props) {
  const handleClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        mapRef.current?.setView([latitude, longitude], 16);
      },
      () => {
        alert('Unable to retrieve your location');
      }
    );
  };

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999]">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={handleClick}
      >
        My Location
      </button>
    </div>,
    document.body
  );
}
