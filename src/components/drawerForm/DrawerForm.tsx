import { Button, Drawer, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';

export function DrawerForm(): JSX.Element {
  const { Title } = Typography;

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
      size="large"
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Title level={2}>Hello</Title>
    </Drawer>
  );
}
