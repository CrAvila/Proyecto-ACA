import { RematchDispatch, RematchRootState } from '@rematch/core';
import { RootModel } from 'state/models';
import { QuakeFilter } from './api/request';
import { Quake } from './api/responses';

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export type User = {
  name: string;
  pictureUrl: string;
};

export type UserState = {
  token: string | undefined;
  user: User;
};

export type UIState = {
  layerForm: {
    open: boolean;
    loading: boolean;
  };
  quakeForm: {
    rangePercent: number;
    layerInfo: {
      color: string;
    };
    data: QuakeFilter;
  };
  selected: Quake | undefined;
  currentLayer: Layer<Quake> | undefined;
};

export type Layer<T> = {
  name: string;
  color: string;
  visible: boolean;
  data: T[];
};

export type LayerState = {
  quakeLayers: Record<string, Layer<Quake>>;
};
