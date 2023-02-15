import { Layer, LayerState } from 'types/state';
import { Quake } from 'types/api/responses';
import { cloneDeep } from 'lodash';
export const addQuakeLayer = (s: LayerState, layer: Layer<Quake>): LayerState => {
  const copy = cloneDeep(s);
  copy.quakeLayers[layer.name] = layer;
  return copy;
};

export const removeLayer = (s: LayerState, layerName: string): LayerState => {
  const copy = cloneDeep(s);
  delete copy.quakeLayers[layerName];
  return copy;
};

export const toggleVisible = (s: LayerState, layerName: string): LayerState => {
  const copy = cloneDeep(s);
  const layer = copy.quakeLayers[layerName];
  if (layer) {
    layer.visible = !layer.visible;
  }
  return copy;
};
