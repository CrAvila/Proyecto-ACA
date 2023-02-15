import { Quake } from '../types/api/responses';

export enum Units {
  km = 'Km',
  w = 'Wº',
  n = 'Nº',
  none = ''
}

export function formatToUnit(data: number | undefined, u: Units): string {
  return `${data || 0} ${u}`;
}

export function quakeLocString(q: Quake | undefined): string {
  if (!q) {
    return '??';
  }
  return `${formatToUnit(q.longitude, Units.w)} ${formatToUnit(q.latitude, Units.n)}`;
}

export function quakeTime(q: Quake | undefined): string {
  const date = new Date(q?.date || 0);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
