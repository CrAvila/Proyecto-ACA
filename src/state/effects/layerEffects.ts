import { CapClient } from 'api/capClient';
import { Dispatch, RootState } from 'types/state';

type LayerDispatch = Dispatch['layers'];
export async function loadLayer(this: object, name: string, state: RootState): Promise<void> {
  const that = this as LayerDispatch;
  const token = state.user.token;
  const color = state.ui.quakeForm.layerInfo.color;
  const client = new CapClient(token || 'test-api-key');
  const rest = await client.getQuakes(state.ui.quakeForm.data);
  if (Array.isArray(rest)) {
    that.addQuakeLayer({
      name,
      color,
      data: rest,
      visible: true
    });
  }
}
