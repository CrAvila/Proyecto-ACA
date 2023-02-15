import { Layer, UIState } from 'types/state';
import { FieldChange } from 'types/util';
import { QuakeFilter } from 'types/api/request';
import { RangePickerProps } from 'antd/es/date-picker';
import { Quake } from '../../types/api/responses';

export const changeDrawerForm = (s: UIState, open: boolean): UIState => {
  s.layerForm.open = open;
  return s;
};

export const changeQuakeFormValue = <K extends keyof QuakeFilter>(
  s: UIState,
  update: FieldChange<QuakeFilter, K>
): void => {
  const form = s.quakeForm.data;
  form[update.key] = update.value;
};

export const changeRadiusScale = (s: UIState, percent: number): void => {
  const fix = Math.max(0, percent);
  s.quakeForm.rangePercent = Math.min(fix, 100);
};

export const changeLayerColor = (s: UIState, color: string): void => {
  s.quakeForm.layerInfo.color = color;
};

export const setQuake = (s: UIState, quake: Quake | undefined): void => {
  s.selected = quake;
};

export const setLayer = (s: UIState, layer: Layer<Quake> | undefined): void => {
  s.currentLayer = layer;
};
