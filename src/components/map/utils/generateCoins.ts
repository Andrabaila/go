// src/components/map/utils/generateCoins.ts

export interface Coin {
  id: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
}

/**
 * Генерация массива случайных "монет" в пределах радиуса ~1 км.
 * @param center - центральные координаты [lat, lng]
 * @param count - количество монет
 */
export function generateCoins(center: [number, number], count: number): Coin[] {
  const coins: Coin[] = [];

  for (let i = 0; i < count; i++) {
    const r = Math.random() * 1000; // радиус до 1 км
    const angle = Math.random() * 2 * Math.PI;

    const dx = (r / 111320) * Math.cos(angle);
    const dy = (r / 111320) * Math.sin(angle);

    coins.push({
      id: `coin-${i}`,
      lat: center[0] + dy,
      lng: center[1] + dx,
      description: `Старинная монета #${i + 1}`,
      image: '/icons/coin_popup.png',
    });
  }

  return coins;
}
