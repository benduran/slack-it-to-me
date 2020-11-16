import { color } from 'csx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, InputLabel, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useChromeEvents } from '../../hooks';
import { getVarLabel, vars, VarKey, readVar, setVar } from '../../slack';

import { ColorPicker, ColorPickerProps } from '../ColorPicker';

const usePopoverStyles = makeStyles(theme => ({
  input: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  inputLabel: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  popoverBody: {
    alignItems: 'center',
    display: 'grid',
    gridGap: theme.spacing(1),
    gridTemplateColumns: '60% 1fr',
    padding: theme.spacing(3),
  },
  popoverHeader: {
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'space-between',
  },
  popoverRoot: {
    width: 340,
  },
}));

export const Popover = () => {
  const classes = usePopoverStyles();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [colors, setColors] = useState(() =>
    Object.keys(vars).reduce(
      (prev, key) => ({
        ...prev,
        [key]: readVar(key as VarKey) ?? '',
      }),
      {} as Record<VarKey, string>,
    ),
  );

  const onExtensionClicked = useCallback(() => setPopoverOpen(prev => !prev), []);

  const handleClosePopover = useCallback(() => setPopoverOpen(false), []);

  const handleColorChange = useCallback(
    (key: VarKey) => (hexString: string, rgbString: string) => setColors(prev => ({ ...prev, [key]: rgbString })),
    [],
  );

  useChromeEvents({ onExtensionClicked });

  const colorPickers = useMemo(
    () =>
      Object.entries(vars).map(([key, cssProp]) => {
        const id = `${key}-${cssProp}`;
        return (
          <React.Fragment key={key}>
            <InputLabel classes={{ root: classes.inputLabel }} htmlFor={id}>
              {getVarLabel(key as VarKey)}
            </InputLabel>
            <span>
              <ColorPicker
                className={classes.input}
                id={id}
                onColorChange={handleColorChange(key as VarKey)}
                value={color(colors[key as VarKey]).toHexString()}
              />
            </span>
          </React.Fragment>
        );
      }),
    [classes, colors, handleColorChange],
  );

  useEffect(() => {
    Object.entries(colors).forEach(([key, val]) => {
      setVar(key as VarKey, val);
    });
  }, [colors]);

  return (
    <Dialog classes={{ paper: classes.popoverRoot }} onClose={handleClosePopover} open={popoverOpen}>
      <DialogTitle>
        <div className={classes.popoverHeader}>
          <span>Slack It To Me Settings</span>
          <IconButton onClick={handleClosePopover}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <div className={classes.popoverBody}>{colorPickers}</div>
    </Dialog>
  );
};
