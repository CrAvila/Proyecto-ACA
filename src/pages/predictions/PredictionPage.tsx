// src/pages/predictions/PredictionPage.tsx
import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ErrorBoundary } from 'components';
import { ToastContainer } from 'react-toastify';
import * as tf from '@tensorflow/tfjs';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './PredictionPage.scss';

const PredictionPage = () => {
  const route = useLocation();
  const [filterOptions, setFilterOptions] = useState({});
  const [predictionData, setPredictionData] = useState([]);

  const center = [13.794185, -88.89653];

  const onFinish = (values: any) => {
    console.log('Filter options:', values);
    setFilterOptions(values);
    makePredictions(values);
  };

  const makePredictions = async (filterOptions: any) => {
    const model = await tf.loadLayersModel('/path/to/your/model.json');
    const input = tf.tensor([[filterOptions.latitude, filterOptions.longitude, filterOptions.depth]]);
    const predictions = model.predict(input) as tf.Tensor;
    setPredictionData(predictions.arraySync());
  };

  return (
    <Layout className="layout">
      <Layout.Content>
        <ErrorBoundary>
          <div className="prediction-container">
            <Form name="filter-form" layout="inline" onFinish={onFinish}>
              <Form.Item className="form-item" name="latitude" label="Latitude">
                <Input type="number" step="0.01" />
              </Form.Item>
              <Form.Item className="form-item" name="longitude" label="Longitude">
                <Input type="number" step="0.01" />
              </Form.Item>
              <Form.Item className="form-item" name="depth" label="Depth">
                <Input type="number" step="0.1" />
              </Form.Item>
              <Form.Item>
                <Button className="predict-btn" type="primary" htmlType="submit">
                  Predict Magnitude
                </Button>
              </Form.Item>
            </Form>
            <MapContainer center={center} zoom={7} style={{ height: '500px', width: '700px' }} className="map-container">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {predictionData.map((prediction, index) => (
                <Marker key={index} position={[filterOptions.latitude, filterOptions.longitude]}>
                  <Popup>Predicted Magnitude: {prediction}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </ErrorBoundary>
      </Layout.Content>
      <ToastContainer />
    </Layout>
  );
};

export default PredictionPage;
