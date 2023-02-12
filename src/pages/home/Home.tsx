import { Typography } from 'antd';

export function Home(): JSX.Element {
  const { Title } = Typography;
  const onCLick = (): void => {};

  return (
    <div>
      <button onClick={onCLick}>bum</button>
      <Title level={1}>You are in home</Title>
    </div>
  );
}
