import { Quake } from 'types/api/responses';

export function layerLat(d: object): number {
  return (d as Quake).geom.coordinates[1];
}

export function layerLng(d: object): number {
  return (d as Quake).geom.coordinates[0];
}

export function layerHeight(d: object): number {
  return (d as Quake).magnitude * 0.03;
}

export function getLayerColor(): string {
  return '#ffffff';
}
