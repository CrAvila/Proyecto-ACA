export type Range<T> = {
  min: T;
  max: T;
};

export type QuakeSort =
  | 'Id'
  | 'Date'
  | 'Latitude'
  | 'Longitude'
  | 'Magnitude'
  | 'Depth'
  | 'Intensity';

export type QuakeFilter = {
  date: Range<string | undefined>;
  sort: QuakeSort;
  magnitude: Range<number>;
  depth: Range<number>;
  intensity: Range<number>;
  latitude?: Range<number>;
  longitude?: Range<number>;
};
