import { LayerState } from 'types/state';
import { createModel } from '@rematch/core';
import { addQuakeLayer } from '../reducers/layerReducer';
import { loadLayer } from '../effects/layerEffects';

const initialState: LayerState = {
  quakeLayers: {}
};

export const layersModel = createModel()({
  state: initialState,
  reducers: {
    addQuakeLayer
  },
  effects: {
    loadLayer
  }
});
