import { useState } from 'react';
import './Charts.scss';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { countries } from './countries';

export function Charts(): JSX.Element {
  const [lightMode, setLightMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const data = [
    { date: '2023-01-01', magnitude: 4.5, lat: 13.6929, lon: -89.2182, depth: 10 },
    { date: '2023-02-15', magnitude: 5.2, lat: 13.7039, lon: -89.2132, depth: 15 },
    { date: '2023-03-30', magnitude: 3.8, lat: 13.7329, lon: -89.2382, depth: 8 },
    { date: '2023-04-25', magnitude: 4.9, lat: 13.7129, lon: -89.2282, depth: 12 },
    { date: '2023-05-10', magnitude: 4.3, lat: 13.6829, lon: -89.2482, depth: 11 },
    { date: '2023-06-05', magnitude: 5.1, lat: 13.7229, lon: -89.2582, depth: 9 },
    { date: '2023-06-05', magnitude: 6, lat: 13.7329, lon: -89.2182, depth: 14 }
  ];

  const togglelightMode = () => {
    setLightMode(!lightMode);
  };

  return (
    <div className={`container ${lightMode ? 'light-mode' : ''}`}>
      <h1 style={{ color: lightMode ? 'black' : 'white' }}>Earthquake Magnitudes</h1>
      <button className={lightMode ? 'light-mode' : ''} onClick={togglelightMode}>
        {lightMode ? 'Dark Mode' : 'Light Mode'}
      </button>

      <select
        className={lightMode ? 'light-mode' : ''}
        value={selectedCountry.name}
        onChange={(e) => {
          const country = countries.find((c) => c.name === e.target.value);
          if (country) setSelectedCountry(country);
        }}
      >
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={lightMode ? '#ccc' : '#444'} />
          <XAxis dataKey="date" type="category" stroke={lightMode ? '#000' : '#fff'} />
          <YAxis dataKey="magnitude" type="number" stroke={lightMode ? '#000' : '#fff'} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ payload }) => {
              if (payload && payload.length) {
                const { date, magnitude, place } = payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: lightMode ? '#fff' : '#222',
                      border: '1px solid #ccc',
                      padding: '10px'
                    }}
                  >
                    <p>
                      <strong>Date:</strong> {date}
                    </p>
                    <p>
                      <strong>Magnitude:</strong> {magnitude}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter name="Earthquake" data={data} fill={lightMode ? '#000' : '#fff'} />
          <Legend />
        </ScatterChart>
      </ResponsiveContainer>
      <div className={`table-container ${lightMode ? 'light-mode' : ''}`}>
        <table>
          <thead>
            <tr>
              <th className={lightMode ? 'light-mode' : ''}>Latitude</th>
              <th className={lightMode ? 'light-mode' : ''}>Longitude</th>
              <th className={lightMode ? 'light-mode' : ''}>Depth</th>
              <th className={lightMode ? 'light-mode' : ''}>Magnitude</th>
              <th className={lightMode ? 'light-mode' : ''}>date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className={lightMode ? 'light-mode' : ''}>{item.lat}</td>
                <td className={lightMode ? 'light-mode' : ''}>{item.lon}</td>
                <td className={lightMode ? 'light-mode' : ''}>{item.depth}</td>
                <td className={lightMode ? 'light-mode' : ''}>{item.magnitude}</td>
                <td className={lightMode ? 'light-mode' : ''}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
