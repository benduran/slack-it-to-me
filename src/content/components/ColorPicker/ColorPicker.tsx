import { color } from 'csx';
import React, { HTMLProps, useCallback, useRef } from 'react';

export interface ColorPickerProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'type'> {
  onColorChange: (hexString: string, rgbString: string, rgbArray: [number, number, number]) => any;
}

export const ColorPicker = ({ onColorChange, ...rest }: ColorPickerProps) => {
  const changeTimeoutRef = useRef<any>(null);

  const debouncedChange = useCallback<ColorPickerProps['onColorChange']>(
    (...args) => {
      if (changeTimeoutRef.current) changeTimeoutRef.current = clearTimeout(changeTimeoutRef.current);
      changeTimeoutRef.current = setTimeout(() => {
        onColorChange(...args);
      }, 100);
    },
    [onColorChange],
  );

  const handleColorChange = useCallback(
    ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const rgb = color(value).toRGB();
      debouncedChange(value, rgb.toString(), [rgb.red(), rgb.green(), rgb.blue()]);
    },
    [debouncedChange],
  );
  return <input {...rest} onChange={handleColorChange} type='color' />;
};
