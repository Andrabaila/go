// src/components/map/ObjectFilterPanel.tsx

interface ObjectFilterPanelProps {
  availableTypes: string[];
  selectedTypes: string[];
  onToggle: (type: string) => void;
}

// Константа со стилем панели фильтров
const PANEL_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 70, // отступ, чтобы не перекрывать контролы зума Leaflet
  zIndex: 1000,
  background: 'gray',
  padding: 10,
  borderRadius: 8,
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
};

export default function ObjectFilterPanel({
  availableTypes,
  selectedTypes,
  onToggle,
}: ObjectFilterPanelProps) {
  return (
    <div style={PANEL_STYLE}>
      {availableTypes.map((type) => (
        <div key={type}>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => onToggle(type)}
            />
            {` ${type.charAt(0).toUpperCase()}${type.slice(1)}`}
          </label>
        </div>
      ))}
    </div>
  );
}
