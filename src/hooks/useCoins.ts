import { useEffect, useState } from 'react';
import { generateCoins, type Coin } from '@/components/map/utils/generateCoins';
import { BASE_COORDS, COINS_COUNT } from '@/constants/map';

export function useCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('coinsData');
    if (stored) {
      setCoins(JSON.parse(stored));
    } else {
      const newCoins = generateCoins(BASE_COORDS, COINS_COUNT);
      setCoins(newCoins);
      localStorage.setItem('coinsData', JSON.stringify(newCoins));
    }
  }, []);

  const removeCoin = (id: string) => {
    const updated = coins.filter((c) => c.id !== id);
    setCoins(updated);
    localStorage.setItem('coinsData', JSON.stringify(updated));
  };

  return { coins, setCoins, removeCoin };
}
