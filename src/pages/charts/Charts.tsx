import { useState, useEffect, useRef } from 'react';
import './Charts.scss';
import { CapClient } from '../../api/capClient';
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

// Definición de la interfaz para los datos de terremotos
interface EarthquakeData {
  date: string;
  magnitude: number;
  lat: number;
  lon: number;
  depth: number;
  place: string;
}

export function Charts(): JSX.Element {
  // Estado para el modo claro/oscuro
  const [lightMode, setLightMode] = useState(false);
  // Estado para el país seleccionado
  const [selectedCountry, setSelectedCountry] = useState(countries[56]);
  // Estado para los datos de terremotos
  const [data, setData] = useState<EarthquakeData[]>([]);
  // useRef para evitar múltiples llamadas a la API
  const hasFetchedData = useRef(false);

  // useEffect para obtener datos de terremotos al cargar el componente
  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchEarthquakeData(selectedCountry.lat, selectedCountry.lon);
      hasFetchedData.current = true;
    }
  }, []);

  // Función para obtener datos de terremotos de la API
  const fetchEarthquakeData = async (lat: number, lon: number) => {
    const capClient = new CapClient('test-api-key');
    try {
      const response = await capClient.getQuakesByLocation(lat, lon, 200);

      if (response instanceof Error) {
        console.error('Error fetching earthquake data:', response.message);
      } else {
        const formattedData = response.features.map((feature) => ({
          date: new Date(feature.properties.time).toISOString().split('T')[0],
          magnitude: feature.properties.mag,
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
          depth: feature.geometry.coordinates[2],
          place: feature.properties.place
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };

  // Manejar el cambio de país seleccionado
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find((c) => c.name === e.target.value);
    if (country) {
      setSelectedCountry(country);
      fetchEarthquakeData(country.lat, country.lon);
    }
  };

  // Alternar entre modo claro y oscuro
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
        onChange={handleCountryChange}
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
