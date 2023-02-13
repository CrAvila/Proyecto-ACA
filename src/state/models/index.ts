import { Models } from '@rematch/core';
import { userModel } from './userModel';
import { uiModel } from './uiModel';

export * from './userModel';
export * from './uiModel';

export interface RootModel extends Models<RootModel> {
  user: typeof userModel;
  ui: typeof uiModel;
}
export const models: RootModel = {
  user: userModel,
  ui: uiModel
};
