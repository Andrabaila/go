import './assets/styles/global.css';
import 'leaflet/dist/leaflet.css';
import MapComponent from './components/map/MapComponent';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1>Walking Game</h1> 
      <div className={styles.mapContainer}>
        <MapComponent />
      </div>
    </div>
  );
}

export default App;
