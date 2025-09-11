// src/App.tsx
import './assets/styles/global.css'; // Импортируем глобальные стили
import 'leaflet/dist/leaflet.css'; // Импортируем стили Leaflet
import MapComponent from './components/map/MapComponent';

function App() {
  return (
    <div className="app">
      {/* Временный заголовок для проверки */}
      <h1>Walking Game</h1> 
      {/* Основной контейнер для карты. Важно задать ему размер! */}
      <div style={{ width: '80vw', height: '70vh', border: '2px solid #ccc' }}>
        <MapComponent />
      </div>
    </div>
  );
}

export default App;