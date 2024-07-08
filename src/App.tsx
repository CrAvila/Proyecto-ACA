import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './App.scss';

export function App(): JSX.Element {
  const route = useLocation();

  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <div className="navbar">
          <Link to="/" className="title" aria-label="QuakeSphere Home">
            QuakeSphere
          </Link>
          <div className="right">
            <Menu theme="dark" mode="horizontal" selectedKeys={[route.pathname]}>
            <Menu.Item key="/">
                <Link to="/" aria-label="Main Page">Main</Link>
              </Menu.Item>
              <Menu.Item key="/home">
                <Link to="/home" aria-label="Home Page">Home</Link>
              </Menu.Item>
              <Menu.Item key="/charts">
                <Link to="/charts" aria-label="Charts Page">Charts</Link>
              </Menu.Item>
              <Menu.Item key="/predictions">
                <Link to="/predictions" aria-label="Predictions Page">Predictions</Link>
              </Menu.Item> 
              <Menu.Item key="/about">
                <Link to="/about" aria-label="About Page">About</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Layout.Header>
      <Layout.Content>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Layout.Content>
      <ToastContainer />
    </Layout>
  );
}
