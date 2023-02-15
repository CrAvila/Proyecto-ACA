import { Layout } from 'antd';
import logo from 'assets/react.svg';
import { Link, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'components';
import 'antd/dist/reset.css';
import './App.scss';

export function App(): JSX.Element {
  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <div className="navbar">
        <img src={logo} alt="CAP logo" className="logo" width={40} />
          <div className='logo-title'>CAP</div>
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/charts">Charts</Link>
              <Link to="/about">About</Link>
           </ul>
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
