import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { makeStyles } from '@mui/styles';
import { TrackerState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api';
import { Link } from '@mui/material';
import { numberWithCommas } from "../coins-table";

const useStyles = makeStyles({
  slider: {
    position: 'relative'
  },
  slide: {
    display: 'block',
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  coinPrice: {
    display: 'block',
    fontSize: 18,
    fontWeight: 500,
    color: '#ffa200',
    marginTop: 3
  }
});

const Carousel = () => {
  const classes = useStyles();
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = TrackerState();
  
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  }

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {
    let changePrice = coin?.price_change_percentage_24h >= 0;
    
    return (
      <Link
        className={classes.slide}
        href={`/coins/${coin.id}`}
        underline="none"
      >
        <img 
          src={coin?.image}
          alt={coin.name}
          height='60'
          style={{ marginBottom: 10 }}
        />

        <div>
          <span style={{marginRight: 10}}>{coin.symbol}</span>
          <span style={{fontWeight: 500, color: changePrice > 0 ? '#ece512' : '#ec1212'}}>
            {changePrice && '+'}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>

        <span className={classes.coinPrice}>
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    )
  });

  const responsive = {
    0: {
      items: 2,
    },
    478: {
      items: 5
    }
  }  

  return (
    <div className={classes.slider}>
      <AliceCarousel
        items={items}
        infinite
        mouseTracking
        autoPlay
        autoPlayInterval={1500}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
      />
    </div>
  )
}

export default Carousel