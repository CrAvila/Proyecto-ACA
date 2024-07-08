// src/App.tsx
import { Layout, Menu } from 'antd';
import { Link, useLocation, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './App.scss';
import { Home, NotFound, Charts, About, PredictionPage, MainWorld } from 'pages/index';

export function App(): JSX.Element {
  const route = useLocation();
  const items = [
    { label: <Link to="/">Main</Link>, key: '/' },
    { label: <Link to="/home">Home</Link>, key: '/home' },
    { label: <Link to="/charts">Charts</Link>, key: '/charts' },
    { label: <Link to="/predictions">Predictions</Link>, key: '/predictions' },
    { label: <Link to="/about">About</Link>, key: '/about' },
  ];

  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <div className="navbar">
          <Link to="/" className="title" aria-label="QuakeSphere Home">QuakeSphere</Link>
          <div className="right">
            <Menu theme="dark" mode="horizontal" selectedKeys={[route.pathname]} items={items} />
          </div>
        </div>
      </Layout.Header>
      <Layout.Content>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<MainWorld />} />
            <Route path="/home" element={<Home />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/about" element={<About />} />
            <Route path="/predictions" element={<PredictionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Layout.Content>
      <ToastContainer />
    </Layout>
  );
}
