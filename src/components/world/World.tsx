import Globe from 'react-globe.gl';
import { Quake } from 'types/api/responses';
import { useAppSelector } from 'hooks';
import * as Layer from 'utils/layer';
import earth from 'assets/textures/8k_earth_daymap.jpg';

export function World(): JSX.Element {
  const layers = useAppSelector((s) => s.layers.quakeLayers);
  const aggregated: Quake[] = [];
  const layerStops: number[] = [];
  for (const layer of Object.values(layers)) {
    if (!layer.visible) {
      continue;
    }
    const index = aggregated.push(...layer.data);
    layerStops.push(index);
  }

  const layersData = Object.values(layers).filter((l) => l.visible);
  const colorFunc = Layer.getLayerColorFunc(aggregated, layerStops);
  // Create the color scale

  return (
    <Globe
      globeImageUrl={earth}
      pointsData={aggregated}
      pointLat={Layer.layerLat}
      pointLng={Layer.layerLng}
      pointAltitude={Layer.layerHeight}
      pointRadius={0.04}
      pointColor={(o: object): string => colorFunc(o, layersData)}
      pointLabel={(d: object): string => `
        <b>${(d as Quake).location}</b>
    `}
    />
  );
}
