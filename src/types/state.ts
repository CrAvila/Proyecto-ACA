import { RematchDispatch, RematchRootState } from '@rematch/core';
import { RootModel } from 'state/models';
import { QuakeFilter } from './api/request';

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
    data: QuakeFilter;
  };
};

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
