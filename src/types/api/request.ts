export type Range<T> = {
  min: T | undefined;
  max: T | undefined;
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
  date?: Range<string>;
  sort: QuakeSort;
  magnitude?: Range<number>;
  depth?: Range<number>;
  intensity?: Range<number>;
  latitude?: Range<number>;
  longitude?: Range<number>;
  descLike: string;
};
