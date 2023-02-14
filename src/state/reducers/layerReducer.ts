import { Layer, LayerState } from 'types/state';
import { Quake } from 'types/api/responses';
export const addQuakeLayer = (s: LayerState, layer: Layer<Quake>): void => {
  s.quakeLayers[layer.name] = layer;
};
