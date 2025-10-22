import { Marker, Popup } from 'react-leaflet';
import PopupGodsend from '@/components/ui/PopupGodsend';
import { useCoins } from '@/hooks/useCoins';
import { coinIcon } from './utils/coinIcon';
import { filterVisibleCoins } from './utils/filterVisibleCoins';

interface Props {
  playerPosition: [number, number] | null;
}

export default function CoinsLayer({ playerPosition }: Props) {
  const { coins, removeCoin } = useCoins();
  const visibleCoins = filterVisibleCoins(coins, playerPosition);

  return (
    <>
      {visibleCoins.map((coin) => (
        <Marker key={coin.id} position={[coin.lat, coin.lng]} icon={coinIcon}>
          <Popup>
            <PopupGodsend
              id={coin.id}
              description={coin.description}
              image={coin.image}
              onTake={removeCoin}
            />
          </Popup>
        </Marker>
      ))}
    </>
  );
}
