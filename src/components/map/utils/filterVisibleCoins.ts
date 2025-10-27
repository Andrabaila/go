import getDistanceMeters from '@/components/map/utils/getDistanceMeters';

interface Coin {
  id: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
  name: string;
  weight: number;
  value: number;
}

export function filterVisibleCoins(
  coins: Coin[],
  playerPosition: [number, number] | null,
  radius = 500
) {
  if (!playerPosition) return [];
  return coins.filter((coin) => {
    const distance = getDistanceMeters(playerPosition, [coin.lat, coin.lng]);
    return distance <= radius;
  });
}
