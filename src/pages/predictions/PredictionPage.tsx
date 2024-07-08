import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ErrorBoundary } from 'components';
import { ToastContainer } from 'react-toastify';
import * as ort from 'onnxruntime-web';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';
import './PredictionPage.scss';

const PredictionPage = () => {
  const [filterOptions, setFilterOptions] = useState({ latitude: 0, longitude: 0, depth: 0 });
  const [prediction, setPrediction] = useState(null);
  const [form] = Form.useForm();
  const [session, setSession] = useState(null);

  const center = [13.794185, -88.89653];

  useEffect(() => {
    const loadModel = async () => {
      try {
        ort.env.wasm.wasmPaths = {
          'ort-wasm.wasm': '/ort-wasm.wasm',
          'ort-wasm-simd.wasm': '/ort-wasm-simd.wasm',
          'ort-wasm-threaded.wasm': '/ort-wasm-threaded.wasm',
          'ort-wasm-simd-threaded.wasm': '/ort-wasm-simd-threaded.wasm',
        };
        const model = await ort.InferenceSession.create('/random_forest_model.onnx');
        setSession(model);
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    };

    loadModel();
  }, []);

  const onFinish = async (values) => {
    console.log('Filter options:', values);
    setFilterOptions(values);
    makePredictions(values);
  };

  const makePredictions = async (filterOptions) => {
    if (session) {
      try {
        const input = new ort.Tensor('float32', Float32Array.from([filterOptions.latitude, filterOptions.longitude, filterOptions.depth]), [1, 3]);
        const feeds = { float_input: input };  // Ensure 'float_input' matches your model input name
        const results = await session.run(feeds);
        const prediction = results['output'].data[0]; // Ensure 'output' matches your model output name
        setPrediction(prediction);
      } catch (error) {
        console.error('Error making predictions:', error);
      }
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
        </ErrorBoundary>
      </Layout.Content>
      <ToastContainer />
    </Layout>
  );
};

export default PredictionPage;
