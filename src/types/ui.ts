// src/types/ui.ts
// 💻 Типы для интерфейсных компонентов

export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}
