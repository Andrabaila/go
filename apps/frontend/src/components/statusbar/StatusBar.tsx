import { useLocalStorage } from '@/hooks';

interface StatusData {
  distance: number; // метры
  exploredArea: number; // км²
  itemsCollected: number; // штук
  balance: number; // goins
}

export default function StatusBar() {
  const [status] = useLocalStorage<StatusData>('status', {
    distance: 0,
    exploredArea: 0,
    itemsCollected: 0,
    balance: 0,
  });

  return (
    <div className="w-full bg-gray-900/80 text-white text-sm flex justify-around items-center py-2 shadow-md">
      <div>
        👣{' '}
        <span className="font-semibold">
          {(status.distance / 1000).toLocaleString(undefined, {
            maximumFractionDigits: 1,
          })}
        </span>
      </div>

      <div>
        🗺️{' '}
        <span className="font-semibold">
          {status.exploredArea.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </span>{' '}
        км²
      </div>

      <div>
        🎒 <span className="font-semibold">{status.itemsCollected}</span>
      </div>

      <div>
        💰 <span className="font-semibold">{status.balance}</span>
      </div>
    </div>
  );
}
