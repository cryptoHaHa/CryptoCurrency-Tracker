import React, { createContext, useState, useEffect, useContext } from 'react';

const Tracker = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('usd');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    if ( currency === 'usd' ) 
      setSymbol('$');
    else if ( currency === 'cad' ) 
      setSymbol('$');
    else if ( currency === 'cny' ) 
      setSymbol('¥');
  }, [currency]);
  
  return (
    <Tracker.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Tracker.Provider>
  )
}

export default CryptoContext;

export const TrackerState = () => {
  return useContext(Tracker);
}