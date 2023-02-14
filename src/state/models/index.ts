import { Models } from '@rematch/core';
import { userModel } from './userModel';
import { uiModel } from './uiModel';
import { layersModel } from './layerModel';

export * from './userModel';
export * from './uiModel';

export interface RootModel extends Models<RootModel> {
  user: typeof userModel;
  ui: typeof uiModel;
  layers: typeof layersModel;
}

export const models: RootModel = {
  user: userModel,
  ui: uiModel,
  layers: layersModel
};
