import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrackerState } from '../CryptoContext';
import { HistoricalChart } from '../config/api'; 
import { styled } from '@mui/system';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';
import { chartDays } from '../config/data';
import DateButton from './date-buttons';

const Container = styled('div')(({theme}) => ({
  flex: '1 1 70%',
  maxWidth: '70%',
  paddingLeft: 20,
  paddingRight: 50,
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
    maxWidth: '100%'
  }
}));

const ButtonSet = styled('div')({
  display: 'flex',
  marginTop: 30
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = TrackerState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  }

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  return (
    <Container>
      {!historicData ? (
        <CircularProgress color='primary' />
      ) : (
        <>
          <Line
            options={{ responsive: true }}

            data={{
              labels: historicData.map((priceDate) => {
                let date = new Date(priceDate[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((priceDate) => priceDate[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: '#27d1aa',
                  backgroundColor: '#0c9677'
                }
              ]
            }}
          />

          <ButtonSet>
            {chartDays.map((day) => 
              <DateButton 
                onClick={() => {
                  setDays(day.value);
                }} 
                selected={day.value === days}
                key={day.label}
              >
                {day.label}
              </DateButton>
            )}
          </ButtonSet>
        </>
      )}
    </Container>
  )
}

export default CoinInfo