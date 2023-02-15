import { LayerState } from 'types/state';
import { createModel } from '@rematch/core';
import { addQuakeLayer, removeLayer, toggleVisible } from '../reducers/layerReducer';
import { loadLayer } from '../effects/layerEffects';
import { RootModel } from './index';

const initialState: LayerState = {
  quakeLayers: {}
};

export const layersModel = createModel<RootModel>()({
  state: initialState,
  reducers: {
    addQuakeLayer,
    removeLayer,
    toggleVisible
  },
  effects: {
    loadLayer
  }
});
