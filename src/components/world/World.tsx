import Globe from 'react-globe.gl';
import colorbrewer from 'colorbrewer';
import { Quake } from 'types/api/responses';
import { useAppSelector } from 'hooks';
import * as Layer from 'utils/layer';

export function World(): JSX.Element {
  const layers = useAppSelector((s) => s.layers.quakeLayers);
  const aggregated: Quake[] = [];
  for (const layer of Object.values(layers)) {
    aggregated.push(...layer.data);
  }

  console.log(aggregated);
  const A = 0;
  const B = 100;

  // Create the color scale

  // Define a function that takes a number and returns the corresponding hex color
  const getColor = colorbrewer.Reds;

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      pointsData={aggregated}
      pointLat={Layer.layerLat}
      pointLng={Layer.layerLng}
      pointAltitude={Layer.layerHeight}
      pointRadius={0.04}
      pointColor={(o: object) => '#ffffff'}
      pointLabel={(d:any): string => `
        <b>${(d as Quake).location}</b>
    `}
    />
  );
}
