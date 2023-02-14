import { Range } from 'types/api/request';
import { Units } from './Unit';
import { Mark } from 'types/UI';
export const scaleMarks: Record<number, string> = {
  0: '30 Km',
  20: '205 Km',
  50: '674 Km',
  75: '1000 Km',
  100: '1600'
};

export function mapWithUnit(val: number, unit: Units): string {
  return `${Math.trunc(val)} ${unit}`.trim();
}

export function createMarks(r: Range<number>, unit: Units, step: number): Mark {
  const marks: Record<number, string> = {};
  for (let x = r.min; x <= r.max; x += step) {
    const fixed = Math.trunc(x);
    marks[x] = mapWithUnit(fixed, unit);
  }
  return marks;
}
