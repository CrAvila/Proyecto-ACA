import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ErrorBoundary } from 'components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './PredictionPage.scss';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const PredictionPage = () => {
  const route = useLocation();

  // States for filtering options and data
  const [filterOptions, setFilterOptions] = useState({});
  const [predictionData, setPredictionData] = useState([]);

  // Placeholder for map center
  const center = [13.794185, -88.89653];

  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <div className="navbar">
          <Link to="/" className="title">
            QuakeSphere
          </Link>
          <div className="right">
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
              <Menu.Item key="/predictions">
                <Link to="/predictions">Predictions</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Layout.Header>
      <Layout.Content>
        <ErrorBoundary>
          <div className="prediction-container">
            <MapContainer center={center} zoom={7} className="map-container">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Render markers or other map elements here */}
            </MapContainer>
            {/* Add filtering options and prediction results here */}
          </div>
        </ErrorBoundary>
      </Layout.Content>
      <ToastContainer />
    </Layout>
  );
};

export default PredictionPage;
