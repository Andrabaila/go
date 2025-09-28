// src/types/game.ts
// 🎮 Игровые сущности

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}
