import { MapContainer, TileLayer } from 'react-leaflet';
import { useState, useMemo } from 'react';
import ObjectLayer, { type MapFeatureCollection } from './ObjectLayer';
import geoJsonData from './osmData.json';

export default function MapComponent() {
  // Получаем уникальные типы объектов из GeoJSON
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    (geoJsonData as MapFeatureCollection).features.forEach((f) => {
      if (f.properties.type) types.add(f.properties.type);
    });
    return Array.from(types);
  }, []);

  // Состояние фильтров — какие типы объектов показывать
  const [filter, setFilter] = useState<string[]>(availableTypes);

  // Переключение фильтров
  const toggleType = (type: string) => {
    setFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Блок фильтров */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 70, // сдвиг вправо, чтобы не перекрывать кнопки зума
          zIndex: 1000,
          background: 'gray',
          padding: 10,
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        }}
      >
        {availableTypes.map((type) => (
          <div key={type}>
            <label>
              <input
                type="checkbox"
                checked={filter.includes(type)}
                onChange={() => toggleType(type)}
              />{' '}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          </div>
        ))}
      </div>

      {/* Карта */}
      <MapContainer
        center={[52.1506, 21.0336]}
        zoom={17}
        style={{ width: '100%', height: '100vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Слой объектов с фильтром */}
        <ObjectLayer
          data={geoJsonData as MapFeatureCollection}
          filterTypes={filter}
        />
      </MapContainer>
    </div>
  );
}
