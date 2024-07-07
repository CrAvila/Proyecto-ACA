import { CapClient } from 'api/capClient';
import { Dispatch, RootState } from 'types/state';
import { FeatureCollection } from 'types/api/responses';

type LayerDispatch = Dispatch['layers'];
export async function loadLayer(this: object, name: string, state: RootState): Promise<void> {
  const that = this as LayerDispatch;
  const token = state.user.token;
  const color = state.ui.quakeForm.layerInfo.color;
  const client = new CapClient(token || 'test-api-key');
  const rest = await client.getQuakes(state.ui.quakeForm.data);
  if ("features" in rest) {
    if (Array.isArray((rest as FeatureCollection).features)) {
      that.addQuakeLayer({
        name,
        color,
        data: (rest as FeatureCollection).features,
        visible: true
      });
    }

  }
  
}
