import { Models } from '@rematch/core';
import { userModel } from './userModel';

export * from './userModel';

export interface RootModel extends Models<RootModel> {
  user: typeof userModel;
}
export const models: RootModel = {
  user: userModel
};
