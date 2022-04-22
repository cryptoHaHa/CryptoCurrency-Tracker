import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TrackerState } from '../CryptoContext';
import { styled } from '@mui/system';
import CoinInfo from '../components/coininfo';
import { LinearProgress } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/coins-table';
import { gql, useLazyQuery } from '@apollo/client';

const Container = styled('div')(({ theme }) =>({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  paddingTop: 50,
  paddingBottom: 50,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Sidebar = styled('div')(({theme}) => ({
  flex: '0 0 30%',
  maxWidth: '30%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: 50,
  paddingRight: 20,
  borderRight: '1px solid #413a6d',
  [theme.breakpoints.down('md')]: {
    flex: '0 0 100%',
    maxWidth: '100%'
  }
}));

const Heading = styled('h3')({
  fontSize: 40,
  fontWeight: 700,
  marginTop: 10,
  marginBottom: 10
});

const Description = styled('p')({
  fontSize: 18,
  textAlign: 'center',
  marginBottom: 30,
  '& a': {
    color: '#ff72d2',
    fontWeight: 600,
    transition: 'all .2s',
    opacity: .8,
    '&:hover': {
      opacity: 1
    }
  }
});

const CoinMainInfo = styled('div')({
  fontSize: 24,
  marginBottom: 10,
  '& .label': {
    fontWeight: 700,
    color: '#01c5ba',
    marginRight: 15
  }
});

const SingleCoin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = TrackerState();

  const GET_SINGLE_COIN = gql`
      query GetSingleCoin($id: ID!, $currency: String!) {
        singleCoin(id: $id, currency: $currency) {
          id
          name
          image
          desc
          rank
          data {
            price
            cap
          }
        }
      }
    `;
  
  const [getCoin, { loading, error, data }] = useLazyQuery(GET_SINGLE_COIN);
  
  useEffect(() => {
    getCoin({
      variables: {
        id: id,
        currency: currency
      }
    });

    if (data) setCoin(data.singleCoin);
  }, [currency, data]);
  
  return (
    <Container>
      {!coin ? (
        <LinearProgress color="primary" />
      ) : (
        <>
        <Sidebar>
          <img 
            src={coin?.image}
            alt={coin?.name}
            height='200'
          />

          <Heading>{coin?.name}</Heading>

          <Description>{parse(coin?.desc?.split('. ')[0])}.</Description>

          <CoinMainInfo>
            <span className='label'>Rank:</span>
            <span className='value'>{coin?.rank}</span>
          </CoinMainInfo>

          <CoinMainInfo>
            <span className='label'>Current Price:</span>
            <span className='value'>
              {symbol}
              {numberWithCommas( coin?.data.price )}
            </span>
          </CoinMainInfo>

          <CoinMainInfo>
            <span className='label'>Market Cap:</span>
            <span className='value'>
              {symbol}
              {numberWithCommas(
                coin?.data.cap
                  .toString()
                  .slice(0, -6)
              )}
            </span>
          </CoinMainInfo>
        </Sidebar>
        
        <CoinInfo coin={coin} />
        </>
      )}
    </Container>
  )
}

export default SingleCoin;