import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  button: {
    marginRight: 20
  }
});

const DateButton = ({ children, onClick, selected }) => {
  const classes = useStyles();

  return (
    <Button 
      onClick={onClick} 
      variant={selected ? 'contained' : 'outlined'}
      color='primary'
      className={classes.button}
    >
      {children}
    </Button>
  )
}

export default DateButton