import styles from './MainMenuButton.module.css';

interface MenuButtonProps {
  type: 'map' | 'quests' | 'inventory' | 'profile';
  activeMenu: 'map' | 'quests' | 'inventory' | 'profile' | null;
  onClick: () => void;
  icon: string;
}

export default function MenuButton({
  type,
  activeMenu,
  onClick,
  icon,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.base} ${activeMenu === type ? styles.active : styles.inactive}`}
    >
      {icon}
    </button>
  );
}
