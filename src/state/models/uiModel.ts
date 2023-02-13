import { createModel } from '@rematch/core';
import { UIState } from 'types/state';
import { changeDrawerForm } from 'state/reducers';

const initialState: UIState = {
  layerForm: {
    loading: false,
    open: false
  },
  filterValues: {
    descLike: '',
    sort: 'Id'
  }
};

export const uiModel = createModel()({
  state: initialState,
  reducers: {
    changeDrawerForm
  }
});
