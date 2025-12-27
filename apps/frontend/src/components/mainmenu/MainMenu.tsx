import MenuButton from './MenuButton';

interface MainMenuProps {
  activeMenu: 'map' | 'quests' | 'inventory' | 'profile' | null;
  onMapSettings: () => void;
  onQuests: () => void;
  onInventory: () => void;
  onProfile: () => void;
}

export default function MainMenu({
  activeMenu,
  onMapSettings,
  onQuests,
  onInventory,
  onProfile,
}: MainMenuProps) {
  return (
    <nav
      className={`fixed bottom-0 left-0 z-[1001] flex w-full items-center justify-around bg-gray-900/80 py-2 text-xs shadow-md`}
    >
      <MenuButton
        type="map"
        activeMenu={activeMenu}
        onClick={onMapSettings}
        icon="🗺️"
      />
      <MenuButton
        type="quests"
        activeMenu={activeMenu}
        onClick={onQuests}
        icon="📜"
      />
      <MenuButton
        type="inventory"
        activeMenu={activeMenu}
        onClick={onInventory}
        icon="🎒"
      />
      <MenuButton
        type="profile"
        activeMenu={activeMenu}
        onClick={onProfile}
        icon="👤"
      />
    </nav>
  );
}
