import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Navbar from './components/Navbar/Navbar';
import TopList from './components/TopList';
import Watchlist from './components/Watchlist';
import { WatchlistContextProvider } from './components/WatchlistContext/WatchlistContext';
import './Styles/_main.scss'

function App() {

  const [topCryptos, setTopCryptos] = useState([])

  const API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false'

  async function getList(){
    const answer = await fetch(API);
    const res = await answer.json();
    setTopCryptos(res);
  }

  useEffect(()=>{
    getList();
  }, [])

  return (
    <BrowserRouter>
    <WatchlistContextProvider>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/'>
          <h3 className='title'>Top 30 Currencies</h3>
          <TopList list={topCryptos}/>
        </Route>
        <Route path='/watchlist'>
          <Watchlist/>
        </Route>
        <Route path='/currency/:id'>
          <Detail />
        </Route>
      </Switch>
    </div> 
    </WatchlistContextProvider>
    </BrowserRouter>
  );
}

export default App;
