import { Button, Input } from 'antd';

export function Login(): JSX.Element {
  return (
    <div>
      <Input placeholder="token" />
      <Button type="primary">Accept</Button>
    </div>
  );
}
