import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@mui/material';
import Carousel from './carousel';

const useStyles = makeStyles({
  banner: {
    position: 'relative',
    backgroundImage: 'url(./banner.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    paddingTop: 60,
    paddingBottom: 60
  },
  bannerOverlay: {
    position: 'absolute',
    left: 0, top: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgb(34 34 34 / 70%)'
  },
  bannerTxt: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: 50
  },
  bannerDesc: {
    color: '#ddd',
    fontSize: 18
  }
});

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      
      <Container>
        <div className={classes.bannerOverlay}></div>
        <div className={classes.bannerTxt}>
          <Typography variant='h1'>Crypto Coin Tracker</Typography>
          <Typography className={classes.bannerDesc}>Get all popular cryptocurrencies information.</Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner