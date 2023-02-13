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
    data: {}
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
