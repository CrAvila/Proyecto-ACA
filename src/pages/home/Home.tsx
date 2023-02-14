import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from 'components';
import { useAppDispatch } from 'hooks';

export function Home(): JSX.Element {
  const { Title } = Typography;
  const dispatch = useAppDispatch();

  const onNewLayer = (): void => {
    dispatch.ui.changeDrawerForm(true);
  };

  return (
    <div>
      <Button onClick={onNewLayer} icon={<PlusOutlined />}>
        New layer
      </Button>
      <Title level={1}>You are in home</Title>
      <DrawerForm />
    </div>
  );
}
