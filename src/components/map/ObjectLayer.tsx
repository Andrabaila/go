import { GeoJSON } from 'react-leaflet';
import type { FeatureCollection, Geometry } from 'geojson';

export interface MapFeatureProperties {
  name: string;
  type: string;
}

export type MapFeatureCollection = FeatureCollection<
  Geometry,
  MapFeatureProperties
>;

interface Props {
  data: MapFeatureCollection;
  filterTypes: string[];
}

export default function ObjectLayer({ data, filterTypes }: Props) {
  const filteredFeatures: MapFeatureCollection = {
    type: 'FeatureCollection',
    features: data.features.filter((f) =>
      filterTypes.includes(f.properties.type)
    ),
  };

  return (
    <GeoJSON
      key={filterTypes.join(',')}
      data={filteredFeatures}
      style={{ color: 'blue', weight: 2 }}
    />
  );
}
