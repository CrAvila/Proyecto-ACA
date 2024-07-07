import { useState, useEffect } from 'react';
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

interface EarthquakeFeature {
  properties: {
    mag: number;
    time: number;
    place: string;
  };
  geometry: {
    coordinates: [number, number, number];
  };
}

interface EarthquakeData {
  date: string;
  magnitude: number;
  lat: number;
  lon: number;
  depth: number;
  place: string;
}

export function Charts(): JSX.Element {
  const [lightMode, setLightMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [data, setData] = useState<EarthquakeData[]>([]);

  useEffect(() => {
    fetchEarthquakeData();
  }, [selectedCountry]);

  const fetchEarthquakeData = async () => {
    try {
      const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${selectedCountry.lat}&longitude=${selectedCountry.lon}&maxradiuskm=200`);
      const data = await response.json();
      const formattedData = data.features.map((feature: EarthquakeFeature) => ({
        date: new Date(feature.properties.time).toISOString().split('T')[0],
        magnitude: feature.properties.mag,
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        depth: feature.geometry.coordinates[2],
        place: feature.properties.place
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  return (
    <div className={`container ${lightMode ? 'light-mode' : ''}`}>
      <h1 style={{ color: lightMode ? 'black' : 'white' }}>Earthquake Magnitudes</h1>
      <button className={lightMode ? 'light-mode' : ''} onClick={toggleLightMode}>
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
                const { date, magnitude, lat, lon, depth, place } = payload[0].payload;
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
                    <p>
                      <strong>Latitude:</strong> {lat}
                    </p>
                    <p>
                      <strong>Longitude:</strong> {lon}
                    </p>
                    <p>
                      <strong>Depth:</strong> {depth} km
                    </p>
                    <p>
                      <strong>Place:</strong> {place}
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
              <th className={lightMode ? 'light-mode' : ''}>Date</th>
              <th className={lightMode ? 'light-mode' : ''}>Place</th>
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
                <td className={lightMode ? 'light-mode' : ''}>{item.place}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}