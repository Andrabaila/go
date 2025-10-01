import { useState } from 'react';
import { createPortal } from 'react-dom';
import { LocateFixed } from 'lucide-react';
import type { Map as LeafletMap } from 'leaflet';

interface Props {
  mapRef: React.RefObject<LeafletMap | null>;
}

export default function LocateButton({ mapRef }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!navigator.geolocation) {
      setError('❌ Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 16); // центрируем карту
        }
        setLoading(false);
      },
      () => {
        setError('⚠️ Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded shadow transition
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          text-white`}
      >
        <LocateFixed
          size={18}
          strokeWidth={2}
          className={loading ? 'animate-spin' : ''}
        />
        {loading ? 'Locating...' : 'My Location'}
      </button>

      {error && (
        <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded shadow w-max">
          {error}
        </div>
      )}
    </div>,
    document.body
  );
}
