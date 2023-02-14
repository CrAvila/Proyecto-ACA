import { createModel } from '@rematch/core';
import { UIState } from 'types/state';
import { changeDrawerForm, changeQuakeFormValue, changeRadiusScale } from 'state/reducers';

const initialState: UIState = {
  layerForm: {
    loading: false,
    open: false
  },
  quakeForm: {
    rangePercent: 5,
    data: {
      descLike: '',
      sort: 'Id',
      depth: {
        min: 0,
        max: 78
      },
      intensity: { min: 1, max: 5 },
      magnitude: { min: 1, max: 5 }
    }
  }
};

export const uiModel = createModel()({
  state: initialState,
  reducers: {
    changeDrawerForm,
    changeQuakeFormValue,
    changeRadiusScale
  }
});
