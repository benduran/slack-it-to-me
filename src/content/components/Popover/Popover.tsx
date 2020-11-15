import React, { useCallback, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useChromeEvents } from '../../hooks';

const usePopoverStyles = makeStyles(theme => ({
  popoverBody: {
    padding: theme.spacing(3),
  },
  popoverHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  popoverRoot: {
    width: 560,
  },
}));

export const Popover = () => {
  const classes = usePopoverStyles();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onExtensionClicked = useCallback(() => setPopoverOpen(prev => !prev), []);

  const handleClosePopover = useCallback(() => setPopoverOpen(false), []);

  useChromeEvents({ onExtensionClicked });

  return (
    <Dialog classes={{ paper: classes.popoverRoot }} onClose={handleClosePopover} open={popoverOpen}>
      <DialogTitle>
        <div className={classes.popoverHeader}>
          <span>Slack It To Me - Settings</span>
          <IconButton onClick={handleClosePopover}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <Typography className={classes.popoverBody} variant='body1'>
        Your theme picker settings go here
      </Typography>
    </Dialog>
  );
};
