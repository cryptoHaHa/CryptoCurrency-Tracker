import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrackerState } from '../CryptoContext';
import { 
  Container, 
  LinearProgress, 
  Pagination, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField 
} from '@mui/material';
import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { gql, useLazyQuery } from '@apollo/client';

const HeadingTitle = styled('h4')({
  fontSize: 25,
  fontWeight: 600,
  textAlign: 'center',
  marginBottom: 50
});

const CoinDesc = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 15
});

const useStyles =  makeStyles({
  container: {
    marginTop: 50,
    paddingBottom: 70
  },
  input: {
    width: '100%',
    marginBottom: 20
  },
  coinHeadCell: {
    fontSize: 18,
    color: '#9c99ae',
    border: 'none'
  },
  coinTableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#2d1446'
    },
    '&:hover': {
      backgroundColor: '#1e1846'
    },
    '& td': {
      border: 'none'
    },
    transition: 'all .2s',
    cursor: 'pointer'
  },
  coinTableCell: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 45
  }
});

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { currency, symbol } = TrackerState();
  const classes = useStyles();
  const navigate = useNavigate();

  const GET_COINS = gql`
    query GetCoinLst($currency: String!) {
      coinList(currency: $currency) {
        id
        name
        symbol
        image
        current_price
        change_percent_1d
        market_cap
        ath
      }
    }
  `;

  const [getCoins, { loading, error, data }]  = useLazyQuery(GET_COINS);
  
  useEffect(() => {
    getCoins({
      variables: {
        currency: currency
      }
    });

    if (data) {
      setCoins(data.coinList);
    }
  }, [currency, data]);
  
  const coinSearch = () => {
    return coins.filter((coin) => 
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    )
  };
  
  return (
    <Container className={classes.container}>
      <HeadingTitle>Cryptocurrency Prices List</HeadingTitle>

      <TextField 
        id="filled-basic"
        className={classes.input} 
        label="Search your crypto currency..." 
        variant="filled" 
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer>
        {loading ? (
          <LinearProgress color="primary" />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {['Coin', 'Price', '24h Change', 'Market Cap', 'ATH'].map((head) => (
                  <TableCell 
                    key={head}
                    className={classes.coinHeadCell}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coinSearch()
                .slice((page - 1) * 10, (page -1) * 10 + 10)
                .map((row) => {
                const changePrice = row.change_percent_1d > 0;

                return (
                  <TableRow
                    onClick={() => navigate(`/single-coin/${row.id}`)} 
                    key={row.name}
                    className={classes.coinTableRow}
                  >
                    <TableCell className={classes.coinTableCell}>
                      <img 
                        src={row.image}
                        alt={row.name}
                        height='50'
                      />
                      <CoinDesc>
                        <span 
                          style={{textTransform: 'uppercase', fontSize: 20, fontWeight: 600}}
                        >
                          {row.symbol}
                        </span>
                        <span
                          style={{fontSize: 16, color: '#ddd'}}
                        >
                          {row.name}
                        </span>
                      </CoinDesc>
                    </TableCell>

                    <TableCell>
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>

                    <TableCell>
                      <span style={{fontWeight: 500, color: changePrice > 0 ? '#ece512' : '#ec1212'}}>
                        {changePrice && '+'}
                        {row?.change_percent_1d?.toFixed(2)}%
                      </span>
                    </TableCell>

                    <TableCell>
                      {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                    </TableCell>

                    <TableCell>
                      {symbol} {numberWithCommas(row.ath.toFixed(2))}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Pagination 
        count={Math.floor((coinSearch().length/10))}
        className={classes.pagination}
        onChange={(_, value) => {
          setPage(value);
          window.scroll({
            top: 450,
            left: 0,
            behavior: 'smooth'
          });
        }}
      />
    </Container>
  )
}

export default CoinsTable;

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}