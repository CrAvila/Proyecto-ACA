import { Button, Drawer, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { QuakeForm } from '../forms/QuakeForm';

export function DrawerForm(): JSX.Element {
  const state = useAppSelector((s) => s.ui.layerForm);
  const filter = useAppSelector((s) => s.ui.quakeForm.data);
  const dispatch = useAppDispatch();

  const { open, loading } = state;

  const onClose = (): void => {
    dispatch.ui.changeDrawerForm(false);
  };

  const onAdd = (): void => {
    dispatch.layers.loadLayer(filter);
  };

  return (
    <Drawer
      title="Create a new layer"
      closable={false}
      maskClosable={false}
      bodyStyle={{ paddingBottom: 80 }}
      onClose={onClose}
      placement="right"
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onAdd} type="primary">
            Add
          </Button>
        </Space>
      }
    >
      <QuakeForm />
    </Drawer>
  );
}
