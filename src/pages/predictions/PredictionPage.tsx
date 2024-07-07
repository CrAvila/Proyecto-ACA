import React, { useState } from 'react';
import { Layout, Menu , Form, Input, Button} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ErrorBoundary } from 'components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const PredictionPage = () => {
  const route = useLocation();

  // States for filtering options and data
  const [filterOptions, setFilterOptions] = useState({});
  const [predictionData, setPredictionData] = useState([]);

  // Placeholder for map center
  const center = [13.794185, -88.89653];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onFinish = (values: never) => {
    console.log('Filter options:', values);
    // Update filterOptions state
    setFilterOptions(values);
    // TODO: Fetch filtered data
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <Layout className="layout">

      <Layout.Content>
        <ErrorBoundary>
          <div className="prediction-container">
            <Form
              name="filter-form"
              layout="inline"
              onFinish={onFinish}
            >
              <Form.Item name="startDate" label="Start Date">
                <Input type="date" />
              </Form.Item>
              <Form.Item name="endDate" label="End Date">
                <Input type="date" />
              </Form.Item>
              <Form.Item name="minMagnitude" label="Min Magnitude">
                <Input type="number" step="0.1" />
              </Form.Item>
              <Form.Item name="maxMagnitude" label="Max Magnitude">
                <Input type="number" step="0.1" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Apply Filters
                </Button>
              </Form.Item>
            </Form>
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
