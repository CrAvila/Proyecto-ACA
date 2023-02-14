export type Quake = {
  id: number;
  date: string;
  latitude: number;
  longitude: number;
  location: string;
  depth: number;
  magnitude: number;
  intensity: number;
  intensityDescription: string;
  geom: {
    type: 'Point';
    coordinates: [Lng: number, Lat: number];
  };
};
