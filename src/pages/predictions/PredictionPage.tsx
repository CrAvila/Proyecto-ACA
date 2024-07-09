import React, { useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ErrorBoundary } from 'components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './PredictionPage.scss';

const PredictionPage = () => {
  const [filterOptions, setFilterOptions] = useState({ latitude: 0, longitude: 0, depth: 0 });
  const [prediction, setPrediction] = useState(null);
  const [form] = Form.useForm();

  const center = [13.794185, -88.89653];

  const onFinish = async (values) => {
    console.log('Filter options:', values);
    setFilterOptions(values);
    await makePredictions(values);
  };

  const makePredictions = async (filterOptions) => {
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterOptions),
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error making predictions:', error);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFilterOptions((prev) => {
          const newOptions = { ...prev, latitude: lat, longitude: lng };
          form.setFieldsValue(newOptions);
          return newOptions;
        });
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

            <Form form={form} name="filter-form" layout="inline" onFinish={onFinish} initialValues={filterOptions}>

              <div className='prediction-title'>
                <h1>Magnitude Predictor</h1>
                <p>Select a place to predict the magnitude of the next earthquake there.</p>
              </div>

              {prediction !== null && (
                <div className="prediction-result">
                  <h3>Predicted Magnitude: {prediction.toFixed(1)}</h3>
                </div>
              )}

              <Form.Item className="form-item" name="latitude" label="Latitude">
                <Input type="number" step="0.01" />
              </Form.Item>
              <Form.Item className="form-item" name="longitude" label="Longitude">
                <Input type="number" step="0.01" />
              </Form.Item>
              <Form.Item className="form-item" name="depth" label="Depth">
                <Input type="number" step="0.1" min="0" />
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
              {prediction !== null && (
                <Marker position={[filterOptions.latitude, filterOptions.longitude]}>
                  <Popup>Predicted Magnitude: {prediction}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          <div className="notebook">
            <h3>How does this work?</h3>
            <a href="https://colab.research.google.com/drive/1dx0-o1pSYkzCiWkAmxBqZWZ2M5tuaBJs?usp=sharing"
               target="_blank" rel="noopener noreferrer">
              View the Notebook
            </a>
          </div>

        </ErrorBoundary>
      </Layout.Content>
      <ToastContainer />
    </Layout>
  );
};

export default PredictionPage;
