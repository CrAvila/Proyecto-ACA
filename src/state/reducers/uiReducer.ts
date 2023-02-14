import { UIState } from 'types/state';
import { FieldChange } from 'types/util';
import { QuakeFilter } from 'types/api/request';

export const changeDrawerForm = (s: UIState, open: boolean): UIState => {
  s.layerForm.open = open;
  return s;
};

export const changeQuakeFormValue = <K extends keyof QuakeFilter>(
  s: UIState,
  update: FieldChange<QuakeFilter, K>
): UIState => {
  const form = s.quakeForm.data;
  form[update.key] = update.value;
  return s;
};

export const changeRadiusScale = (s: UIState, percent: number): UIState => {
  console.log(percent);
  const fix = Math.max(0, percent);
  s.quakeForm.rangePercent = Math.min(fix, 100);
  return s;
};
