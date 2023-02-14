import { Layer, LayerState } from 'types/state';
import { Quake } from 'types/api/responses';
import { cloneDeep } from 'lodash';
export const addQuakeLayer = (s: LayerState, layer: Layer<Quake>): LayerState => {
  const copy = cloneDeep(s);
  copy.quakeLayers[layer.name] = layer;
  return copy;
};
