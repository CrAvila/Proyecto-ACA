import { UIState } from 'types/state';

export const changeDrawerForm = (s: UIState, open: boolean): UIState => {
  s.layerForm.open = open;
  return s;
};
