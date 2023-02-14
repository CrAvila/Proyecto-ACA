import { World } from 'components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from 'components';
import { useAppDispatch } from 'hooks';

export function Home(): JSX.Element {
  const dispatch = useAppDispatch();

  const onNewLayer = (): void => {
    dispatch.ui.changeDrawerForm(true);
  };

  return (
    <div>
      <Button onClick={onNewLayer} icon={<PlusOutlined />}>
        New layer
      </Button>
      <World />
      <DrawerForm />
    </div>
  );
}
