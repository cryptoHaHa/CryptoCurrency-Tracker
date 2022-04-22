import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Homepage from './pages/homepage';
import SingleCoin from './pages/single-coin';
import './App.css';
import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2d9cdb'
    }    
  },
  typography: {
    fontFamily: 'Nunito Sans',
    fontWeight: '400',

    h1: {
      fontSize: 50,
      fontWeight: 900,
      marginBottom: 20
    }
  }
});

const MainComponent = styled('main')({
  backgroundColor: '#080134',
  color: '#fff',
  minHeight: '100vh'
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache().restore({}),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <MainComponent>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path='/' element={<Homepage />} />
              <Route path='/single-coin/:id' element={<SingleCoin />} />
            </Routes>
          </BrowserRouter>
        </MainComponent>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
