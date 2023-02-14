import { QuakeFilter } from 'types/api/request';
import { CapClient } from 'api/capClient';
import { Dispatch, RootState } from 'types/state';

type LayerDispatch = Dispatch['layers'];
export async function loadLayer(this: object, payload: QuakeFilter, s: any, name: string): Promise<void> {
  const that = this as LayerDispatch;
  const ss = s as RootState;
  const token = ss.user.token;
  const client = new CapClient(token || 'test-api-key');
  const rest = await client.getQuakes(payload);
  if (Array.isArray(rest)) {
    console.log('success');
    that.addQuakeLayer({
      name,
      data: rest,
      visible: true
    });
  }
}
