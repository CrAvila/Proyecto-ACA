import { Layout } from 'antd';
import logo from 'assets/react.svg';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'components';
import 'antd/dist/reset.css';
import './App.scss';

export function App(): JSX.Element {
  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <img src={logo} alt="GAF energy logo" className="logo" width={40} />
      </Layout.Header>
      <Layout.Content>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Layout.Content>
    </Layout>
  );
}
