import { useState, useEffect } from 'react';
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
  const data = [
    { date: '2023-01-01', magnitude: 4.5 },
    { date: '2023-02-15', magnitude: 5.2 },
    { date: '2023-03-30', magnitude: 3.8 },
    { date: '2023-04-25', magnitude: 4.9 },
    { date: '2023-05-10', magnitude: 4.3 },
    { date: '2023-06-05', magnitude: 5.1 },
    { date: '2023-06-05', magnitude: 6 }
  ];

  return (
    <div>
      <h1>Earthquake Magnitudes</h1>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" type='category'/>
          <YAxis dataKey="magnitude" type='number'/>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Earthquake" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
