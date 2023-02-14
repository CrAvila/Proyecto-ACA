import { HexColorPicker } from 'react-colorful';
import { useDebouncyEffect } from 'use-debouncy';
import { useState } from 'react';

export type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

export function ColorPicker(props: ColorPickerProps): JSX.Element {
  const { color, onChange } = props;
  const [colorValue, setColorValue] = useState(color);
  useDebouncyEffect(() => onChange(colorValue), 200, [colorValue]);
  return <HexColorPicker style={{ marginLeft: '8px' }} color={color} onChange={setColorValue} />;
}
