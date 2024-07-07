import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ErrorBoundary } from 'components';
import { ToastContainer } from 'react-toastify';
import * as tf from '@tensorflow/tfjs';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './PredictionPage.scss';

const PredictionPage = () => {
  const route = useLocation();
  const [filterOptions, setFilterOptions] = useState({ latitude: 0, longitude: 0, depth: 0 });
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

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFilterOptions(prev => ({ ...prev, latitude: lat, longitude: lng }));
      },
    });

    return filterOptions.latitude !== 0 && filterOptions.longitude !== 0 ? (
      <Marker position={[filterOptions.latitude, filterOptions.longitude]}>
        <Popup>
          Latitude: {filterOptions.latitude}, Longitude: {filterOptions.longitude}
        </Popup>
      </Marker>
    ) : null;
  };

  return (
    <Layout className="layout">
      <Layout.Content>
        <ErrorBoundary>
          <div className="prediction-container">
            <Form name="filter-form" layout="inline" onFinish={onFinish} initialValues={filterOptions}>
              <Form.Item className="form-item" name="latitude" label="Latitude">
                <Input value={filterOptions.latitude} type="number" step="0.01" />
              </Form.Item>
              <Form.Item className="form-item" name="longitude" label="Longitude">
                <Input value={filterOptions.longitude} type="number" step="0.01" />
              </Form.Item>
              <Form.Item className="form-item" name="depth" label="Depth">
                <Input value={filterOptions.depth} type="number" step="0.1" />
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
              <LocationMarker />
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
