// src/types/map.ts

import type { FeatureCollection, Geometry } from 'geojson';

export interface MapFeatureProperties {
  name: string;
  type: string;
}

export type MapFeatureCollection = FeatureCollection<
  Geometry,
  MapFeatureProperties
>;
