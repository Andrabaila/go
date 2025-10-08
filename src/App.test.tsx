import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import App from './App';

// ✅ Мокаем компоненты без объявления неиспользуемых аргументов
vi.mock('@/components', () => {
  const MapComponent: React.FC<{ mapRef: RefObject<LeafletMap> }> = () => (
    <div data-testid="map-component">Map</div>
  );

  const LocateButton: React.FC<{ mapRef: RefObject<LeafletMap> }> = () => (
    <button data-testid="locate-button">Locate</button>
  );

  return { MapComponent, LocateButton };
});

describe('App', () => {
  it('renders all main components', () => {
    render(<App />);

    expect(screen.getByTestId('map-component')).toBeInTheDocument();
    expect(screen.getByTestId('locate-button')).toBeInTheDocument();
  });
});
