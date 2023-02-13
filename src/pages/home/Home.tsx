import { Button, Typography } from 'antd';
import { useState } from 'react';
import { Quake } from 'types/api/responses';
import { PlusOutlined } from '@ant-design/icons';
import { CapClient } from 'api/capClient';
import { DrawerForm } from 'components';
import { useAppDispatch } from 'hooks';

export function Home(): JSX.Element {
  const { Title } = Typography;
  const [state, setState] = useState<Quake[]>([]);
  const dispatch = useAppDispatch();
  const onCLick = (): void => {
    const api = new CapClient('test-api-key');
    api.getQuakes({ descLike: '', sort: 'Id' }).then((res) => {
      if (Array.isArray(res)) {
        setState(res);
      } else {
        console.log(res);
      }
    });
  };

  const onNewLayer = (): void => {
    dispatch.ui.changeDrawerForm(true);
  };

  return (
    <div>
      <Button onClick={onNewLayer} icon={<PlusOutlined />}>
        New layer
      </Button>
      <Title level={1}>You are in home</Title>
      <ul>
        {state.map((quake) => (
          <li key={quake.id}>
            {quake.location}, {quake.magnitude}
          </li>
        ))}
      </ul>
      <DrawerForm />
    </div>
  );
}
