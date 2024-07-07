import { Quake } from 'types/api/responses';
import { Layer } from '../types/state';

export function layerLat(d: object): number {
  return (d as Quake).geometry.coordinates[1];
}

export function layerLng(d: object): number {
  return (d as Quake).geometry.coordinates[0];
}

export function layerHeight(d: object): number {
  return (d as Quake).properties.mag * 0.03;
}

function getLayerColor(qIndex: number, stops: number[], layers: Layer<Quake>[]): string {
  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];
    if (qIndex < stop) {
      const batch = layers[i];
      return batch.color;
    }
  }
  return '#ffffff';
}

export function getLayerColorFunc(
  all: Quake[],
  stops: number[]
): (o: object, layers: Layer<Quake>[]) => string {
  return (o: object, l: Layer<Quake>[]): string => {
    const index = all.indexOf(o as Quake);
    return getLayerColor(index, stops, l);
  };
}
