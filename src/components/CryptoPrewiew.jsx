import React, {useContext, useState, useEffect} from "react";
import { WatchlistContext } from "./WatchlistContext/WatchlistContext";
import { Link } from "react-router-dom";
import FavIcon from './FavIcon';


export default function CryptoPreview({crypto, watchList}){

    const [handler, setHandler] = useState(false)

    const { favs, isInWatchlist} = useContext(WatchlistContext);
    const [isFav, setIsFav] = useState(isInWatchlist(crypto));
    const [price, setPrice] = useState();
    const [circulatingSupply, setCirculatingSupply] = useState();
    const [change24h, setChange24h] = useState();
    const [marketCap, setMarketCap] = useState()

    const url = `https://api.coingecko.com/api/v3/coins/`

    async function getPrice(id){
        const respuesta = await fetch(url+id)
        const res = await respuesta.json()
        // For Watchlist items
        setPrice(res.market_data.current_price.usd)
        setCirculatingSupply(res.market_data.circulating_supply)
        setMarketCap(res.market_data.market_cap.usd)
        setChange24h(res.market_data.price_change_percentage_24h)
        setHandler(true);        
    }


    useEffect(()=>{
        isInWatchlist(crypto);
        getPrice(crypto.id)
        setHandler(false)
        setInterval(()=>{
            getPrice(crypto.id)
        }, 20000)
    },[favs])

    return(
        <>
            {handler?
                <tr className='list-preview'>
            <td className='td-pos'>
                <FavIcon isFav={isFav} setIsFav={setIsFav} crypto={crypto}/><p>{crypto.market_cap_rank}</p>
            </td>
            <td className='td-name'>
                <div>
                    <Link to={'/currency/' + crypto.id}>{<img src={crypto.image.thumb || crypto.image} alt="crypto currency" />}</Link>
                    <h3><Link to={'/currency/' + crypto.id}>{crypto.name}</Link></h3><p>{crypto.symbol.toUpperCase()}</p>
                </div>
            </td>
            <td>
                {<p>${price}</p>}
            </td>
            <td>
                <p className={(crypto.price_change_percentage_24h || crypto.market_data.price_change_percentage_24h)>=0 ? 'priceUp' : 'priceDown' }>{ watchList? change24h  : crypto.price_change_percentage_24h || crypto.market_data.price_change_percentage_24h}%</p>
            </td>
            <td>
                <p>{watchList? marketCap : crypto.market_cap || crypto.market_data.market_cap.usd}</p>
            </td>
            <td>
                <p>{watchList? circulatingSupply : crypto.circulating_supply || crypto.market_data.circulating_supply}</p>
            </td>
        </tr>
            : <></>

            }
        </>
    )
}

/*

*/