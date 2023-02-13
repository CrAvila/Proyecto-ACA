import { Typography } from 'antd';
import { useState } from 'react';
import { Quake } from 'types/api/responses';
import { CapClient } from 'api/capClient';

export function Home(): JSX.Element {
  const [state, setState] = useState<Quake[]>([]);
  const { Title } = Typography;
  const onCLick = (): void => {
    const api = new CapClient('test-api-key');
    api.getQuakes({ date: { min: '2020-10-15' } }).then((res) => {
      if (Array.isArray(res)) {
        setState(res);
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div>
      <button onClick={onCLick}>bum</button>
      <Title level={1}>You are in home</Title>
      <ul>
        {state.map((quake) => (
          <li key={quake.id}>
            {quake.location}, {quake.magnitude}
          </li>
        ))}
      </ul>
    </div>
  );
}
