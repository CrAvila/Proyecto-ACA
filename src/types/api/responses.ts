export type Quake = {
  id: number;
  properties: {
    time: Date;
    place: string;
    mag: number;
    mmi: number;
    intensityDescription: string;
  }
  geometry: {
    type: 'Point';
    coordinates: number[];
  };
};

export type FeatureCollection = {
  features: Quake[];
};