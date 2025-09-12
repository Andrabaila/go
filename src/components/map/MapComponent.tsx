// src/components/map/MapComponent.tsx
import { useEffect, useRef } from "react";
import L from "leaflet";

type VisitedPoint = { lat: number; lng: number };
const FOG_RADIUS = 40; // метры (требование)
const STORAGE_KEY = "wg_visited";
const TARGET_AREA_M2 = 2_000_000; // 2 km^2 как вы заявили в MVP

// Поворачивает точку (lat,lng) на bearing и distance -> возвращает new lat,lng
function destinationPoint(lat: number, lng: number, bearingRad: number, distanceM: number): [number, number] {
  const R = 6378137; // радиус Земли в метрах (WGS84 приближ.)
  const φ1 = (lat * Math.PI) / 180;
  const λ1 = (lng * Math.PI) / 180;
  const δ = distanceM / R; // angular distance

  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(bearingRad));
  const λ2 = λ1 + Math.atan2(
    Math.sin(bearingRad) * Math.sin(δ) * Math.cos(φ1),
    Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
  );

  return [ (φ2 * 180) / Math.PI, (λ2 * 180) / Math.PI ];
}

// Аппроксимация круга (polygon) в виде массива точек lat,lng
function circleToPolygon(center: VisitedPoint, radiusM: number, points = 48): L.LatLngExpression[] {
  const res: L.LatLngExpression[] = [];
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * 2 * Math.PI;
    const [lat, lng] = destinationPoint(center.lat, center.lng, theta, radiusM);
    res.push([lat, lng]);
  }
  return res;
}

function haversineDistanceMeters(a: VisitedPoint, b: VisitedPoint) {
  const R = 6371000;
  const toRad = (x:number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aa = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  // держим слой тумана и точки в замыкании эффекта
  useEffect(() => {
    if (!mapRef.current) return;

    // центрируем на указанной вами точке (Stary Imielin vicinity)
    const initialCenter: [number, number] = [52.15, 21.026];
    const map = L.map(mapRef.current, { preferCanvas: true }).setView(initialCenter, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // маркер игрока (circleMarker, чтобы не мучиться с иконками)
    const playerMarker = L.circleMarker(initialCenter, { radius: 6, fillColor: "#2b9", color: "#072", weight: 1, fillOpacity: 1 }).addTo(map);
    const accuracyCircle = L.circle(initialCenter, { radius: 10, color: "#2b9", opacity: 0.25, fillOpacity: 0.05 }).addTo(map);

    // загрузка посещённых точек
    let visited: VisitedPoint[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) visited = JSON.parse(raw) as VisitedPoint[];
    } catch (e) {
      console.warn("Не удалось прочитать localStorage:", e);
    }

    // слой тумана (полигоны с "дырками")
    let fogLayer: L.Polygon | null = null;
    function rebuildFog() {
      if (fogLayer) {
        fogLayer.remove();
        fogLayer = null;
      }
      // внешняя рамка (вполне большая)
      const outer: L.LatLngExpression[] = [
        [-90, -180],
        [-90, 180],
        [90, 180],
        [90, -180]
      ];
      const holes = visited.map((p) => circleToPolygon(p, FOG_RADIUS, 64));
      // polygon с внешней оболочкой и внутренними кольцами (дырками)
      const rings: any[] = [outer, ...holes];
      fogLayer = L.polygon(rings as any, {
        fillRule: "evenodd", // важно
        fillColor: "#000",
        fillOpacity: 0.66,
        stroke: false,
        interactive: false
      }).addTo(map);
    }

    rebuildFog();

    // Контрол с информацией (explored %)
    const infoControl = L.control({ position: "topright" });
    let infoDiv: HTMLDivElement | null = null;
    infoControl.onAdd = function () {
      infoDiv = L.DomUtil.create("div", "map-info") as HTMLDivElement;
      infoDiv.style.padding = "6px";
      infoDiv.style.background = "rgba(255,255,255,0.9)";
      infoDiv.style.borderRadius = "6px";
      infoDiv.style.fontSize = "13px";
      infoDiv.style.minWidth = "120px";
      infoDiv.innerHTML = "<strong>Explored:</strong> 0%";
      return infoDiv;
    };
    infoControl.addTo(map);

    function updateInfo() {
      // простая оценка: суммируем площади кругов (не учитывая перекрытия) / TARGET_AREA_M2
      const singleArea = Math.PI * FOG_RADIUS * FOG_RADIUS;
      const covered = visited.length * singleArea;
      const pct = Math.min(100, (covered / TARGET_AREA_M2) * 100);
      if (infoDiv) infoDiv.innerHTML = `<strong>Explored:</strong> ${pct.toFixed(1)}% <br/>Visited: ${visited.length}`;
    }
    updateInfo();

    // добавление точки (если новое место не внутри уже посещённой окружности)
    function addVisitedIfNeeded(p: VisitedPoint) {
      // если точка уже покрыта - не добавляем
      const inside = visited.some((vp) => haversineDistanceMeters(vp, p) <= FOG_RADIUS * 0.9);
      if (inside) return false;
      visited.push(p);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
      rebuildFog();
      updateInfo();
      return true;
    }

    // обработчик геолокации
    let watchId: number | null = null;
    if (navigator.geolocation && "watchPosition" in navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          playerMarker.setLatLng([lat, lng]);
          accuracyCircle.setLatLng([lat, lng]).setRadius(pos.coords.accuracy || 10);
          // центрировать при первом добавлении / если далеко от экрана
          // map.panTo([lat,lng]) // по желанию включить
          addVisitedIfNeeded({ lat, lng });
        },
        (err) => {
          console.warn("Geolocation error:", err);
        },
        { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
      );
    } else {
      console.warn("Geolocation not available — используйте клик по карте для теста.");
    }

    // для разработки: клик по карте добавляет точку (удобно на десктопе)
    const clickMarkerLayer = L.layerGroup().addTo(map);
    map.on("click", function (e: L.LeafletMouseEvent) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      L.circle([lat, lng], { radius: 4, color: "#09f", fillOpacity: 0.8 }).addTo(clickMarkerLayer).bindTooltip("test");
      addVisitedIfNeeded({ lat, lng });
    });

    // очистка onUnmount
    return () => {
      map.off();
      map.remove();
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
}
