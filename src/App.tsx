import { Layout, Menu } from 'antd';
import logo from 'assets/cap.png';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'components';
import 'antd/dist/reset.css';
import './App.scss';

export function App(): JSX.Element {
  const route = useLocation();
  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <div className="navbar">
          <img src={logo} alt="CAP logo" className="logo" width={100} />
          <Menu theme="dark" mode="horizontal" selectedKeys={[route.pathname]}>
          <Menu.Item key="/">
              <Link to="/">Main</Link>
            </Menu.Item>
            <Menu.Item key="/home">
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="/charts">
              <Link to="/charts">Charts</Link>
            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Layout.Header>
      <Layout.Content>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Layout.Content>
    </Layout>
  );
}
