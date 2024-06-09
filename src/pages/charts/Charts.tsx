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

export function Charts(): JSX.Element {
  const [darkMode, setDarkMode] = useState(false);

  const data = [
    { date: '2023-01-01', magnitude: 4.5, lat: 13.6929, lon: -89.2182, depth: 10 },
    { date: '2023-02-15', magnitude: 5.2, lat: 13.7039, lon: -89.2132, depth: 15 },
    { date: '2023-03-30', magnitude: 3.8, lat: 13.7329, lon: -89.2382, depth: 8 },
    { date: '2023-04-25', magnitude: 4.9, lat: 13.7129, lon: -89.2282, depth: 12 },
    { date: '2023-05-10', magnitude: 4.3, lat: 13.6829, lon: -89.2482, depth: 11 },
    { date: '2023-06-05', magnitude: 5.1, lat: 13.7229, lon: -89.2582, depth: 9 },
    { date: '2023-06-05', magnitude: 6, lat: 13.7329, lon: -89.2182, depth: 14 }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Earthquake Magnitudes</h1>
      <button className={darkMode ? 'dark-mode' : ''} onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ccc'} />
          <XAxis dataKey="date" type="category" stroke={darkMode ? '#fff' : '#000'} />
          <YAxis dataKey="magnitude" type="number" stroke={darkMode ? '#fff' : '#000'} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ payload }) => {
              if (payload && payload.length) {
                const { date, magnitude, place } = payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: darkMode ? '#222' : '#fff',
                      border: '1px solid #ccc',
                      padding: '10px'
                    }}
                  >
                    <p>
                      <strong>Fecha:</strong> {date}
                    </p>
                    <p>
                      <strong>Magnitud:</strong> {magnitude}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter name="Earthquake" data={data} fill={darkMode ? '#fff' : '#000'} />
          <Legend />
        </ScatterChart>
      </ResponsiveContainer>
      <div className={`table-container ${darkMode ? 'dark-mode' : ''}`}>
        <table>
          <thead>
            <tr>
              <th className={darkMode ? 'dark-mode' : ''}>Latitud</th>
              <th className={darkMode ? 'dark-mode' : ''}>Longitud</th>
              <th className={darkMode ? 'dark-mode' : ''}>Profundidad</th>
              <th className={darkMode ? 'dark-mode' : ''}>Magnitud</th>
              <th className={darkMode ? 'dark-mode' : ''}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className={darkMode ? 'dark-mode' : ''}>{item.lat}</td>
                <td className={darkMode ? 'dark-mode' : ''}>{item.lon}</td>
                <td className={darkMode ? 'dark-mode' : ''}>{item.depth}</td>
                <td className={darkMode ? 'dark-mode' : ''}>{item.magnitude}</td>
                <td className={darkMode ? 'dark-mode' : ''}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
