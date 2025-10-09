import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { RefObject, ReactNode } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import MapComponent from './MapComponent';
import type { MapFeatureCollection } from '@/types';

// Мокаем Leaflet
vi.mock('react-leaflet', async () => {
  const actual =
    await vi.importActual<typeof import('react-leaflet')>('react-leaflet');
  const MapContainer: React.FC<{
    children: ReactNode;
    ref?: (map: LeafletMap) => void;
  }> = ({ children }) => <div data-testid="map-container">{children}</div>;
  const TileLayer: React.FC<{ url: string; attribution: string }> = () => (
    <div data-testid="tile-layer" />
  );
  return { ...actual, MapContainer, TileLayer };
});

// Мокаем дочерние компоненты
vi.mock('@/components', () => ({
  ObjectLayer: ({ filterTypes }: { filterTypes: string[] }) => (
    <div data-testid="object-layer">{filterTypes.join(',')}</div>
  ),
  ObjectFilterPanel: ({ availableTypes }: { availableTypes: string[] }) => (
    <div data-testid="object-filter-panel">{availableTypes.join(',')}</div>
  ),
}));

// Мокаем JSON с default
vi.mock('@/assets/data/osmData.json', () => ({
  default: {
    features: [
      { properties: { type: 'building' } },
      { properties: { type: 'park' } },
    ],
  } as MapFeatureCollection,
}));

describe('MapComponent', () => {
  it('renders map, layers and filter panel', () => {
    const mapRef: RefObject<LeafletMap | null> = { current: null };

    render(<MapComponent mapRef={mapRef} />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
    expect(screen.getByTestId('object-layer')).toBeInTheDocument();
    expect(screen.getByTestId('object-filter-panel')).toBeInTheDocument();
  });

  it('initializes available types correctly', () => {
    render(<MapComponent mapRef={{ current: null }} />);
    const panel = screen.getByTestId('object-filter-panel');
    expect(panel.textContent).toContain('building');
    expect(panel.textContent).toContain('park');
  });
});
