import { RematchDispatch, RematchRootState } from '@rematch/core';
import { RootModel } from 'state/models';

export type User = {
  name: string;
  pictureUrl: string;
};

export type UserState = {
  token: string | undefined;
  user: User;
};

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
