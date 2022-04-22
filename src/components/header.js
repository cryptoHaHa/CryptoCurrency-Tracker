import { 
  AppBar, 
  Container, 
  Toolbar, 
  Typography, 
  Select, 
  MenuItem
} from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrackerState } from '../CryptoContext';

const useStyles = makeStyles({
  logo: {
    flex: 1,
    fontWeight: 900,
    color: '#01c5ba',
    cursor: 'pointer'
  }
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = TrackerState();

  return (
    <AppBar position='static' color='transparent'>
      <Container>
        <Toolbar>
          <Typography 
            onClick={() => navigate('/')} 
            className={classes.logo} 
            variant="h6" 
            component="div"
          >
            Crypto Tracker
          </Typography>

          <Select 
            variant='outlined'
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ height: 40 }}
          >
            <MenuItem value={'usd'}>USD</MenuItem>
            <MenuItem value={'cad'}>CAD</MenuItem>
            <MenuItem value={'cny'}>CNY</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header