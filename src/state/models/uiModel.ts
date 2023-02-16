import { createModel } from '@rematch/core';
import { UIState } from 'types/state';
import {
  changeLayerColor,
  changeQuakeFormValue,
  changeDrawerForm,
  changeRadiusScale,
  setQuake,
  setLayer, changeSort,
} from 'state/reducers';

const initialState: UIState = {
  layerForm: {
    loading: false,
    open: false
  },
  quakeForm: {
    rangePercent: 5,
    layerInfo: {
      color: '#ffffff'
    },
    data: {
      date: {
        max: undefined,
        min: undefined
      },
      sort: 'Date',
      depth: {
        min: 0,
        max: 78
      },
      intensity: { min: 1, max: 5 },
      magnitude: { min: 1, max: 5 }
    }
  },
  selected: undefined,
  currentLayer: undefined
};

export const uiModel = createModel()({
  state: initialState,
  reducers: {
    changeLayerColor,
    changeQuakeFormValue,
    changeDrawerForm,
    changeRadiusScale,
    setQuake,
    setLayer,
    changeSort
  }
});
