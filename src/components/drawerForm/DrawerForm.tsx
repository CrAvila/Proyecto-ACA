import { Button, Drawer, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { QuakeForm } from '../forms/QuakeForm';

export function DrawerForm(): JSX.Element {
  const state = useAppSelector((s) => s.ui.layerForm);
  const dispatch = useAppDispatch();

  const { open, loading } = state;

  const onClose = (): void => {
    dispatch.ui.changeDrawerForm(false);
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      }
    >
      <QuakeForm />
    </Drawer>
  );
}
