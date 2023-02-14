import { Button, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';

export function Home(): JSX.Element {
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const data = useAppSelector((s) => s.layers?.quakeLayers);

  const elements = data['test-layer']?.data || [];
  const onNewLayer = (): void => {
    dispatch.ui.changeDrawerForm(true);
  };

  return (
    <div>
      <Button onClick={onNewLayer} icon={<PlusOutlined />}>
        New layer
      </Button>
      <Title level={1}>You are in home</Title>
      <List>
        {elements.map((e) => {
          return (
            <List.Item key={e.id}>
              <p>{e.location}</p>
              <p>{e.intensityDescription}</p>
              <p>
                Mag {e.magnitude} pro {e.depth}
              </p>
            </List.Item>
          );
        })}
      </List>
      <DrawerForm />
    </div>
  );
}
