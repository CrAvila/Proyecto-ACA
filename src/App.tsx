import { useState } from 'react';
import { Button, Layout } from 'antd';
import logo from './assets/react.svg';
import 'antd/dist/reset.css';

export function App(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Layout.Header>
        <img src={logo} alt="GAF energy logo" className="logo" width={40} />
      </Layout.Header>
      <Layout.Content>
        <p>{count}</p>
        <Button onClick={(): void => setCount(count + 1)}>+</Button>
      </Layout.Content>
      <Layout.Footer>
        <p>footer</p>
      </Layout.Footer>
    </Layout>
  );
}
