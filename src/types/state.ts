import { RematchDispatch, RematchRootState } from '@rematch/core';
import { RootModel } from 'state/models';

export type User = {
  name: string;
  pictureUrl: string;
};

export type QuakeFormState = {
  dateMin?: Date;
  dateMax?: Date;
  magnitudeMin?: number;
  magnitudeMax?: number;
  intensityMin?: number;
  intensityMax?: number;
  depthMin?: number;
  depthMax?: number;
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
    data: QuakeFormState;
  };
};

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
