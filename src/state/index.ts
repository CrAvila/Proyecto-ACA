import { models, RootModel } from './models';
import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
export const store = init({
  models,
  plugins: [immerPlugin<RootModel>()]
});

export type Store = typeof store;
