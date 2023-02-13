import { UserState } from 'types/state';
import { createModel } from '@rematch/core';

const initialState: UserState = {
  token: undefined,
  user: {
    name: '',
    pictureUrl: ''
  }
};

export const userModel = createModel()({
  state: initialState,
  reducers: {
    caca: (x, v, q) => {},
  }
});
