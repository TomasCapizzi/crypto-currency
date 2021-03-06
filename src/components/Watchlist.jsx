import React, {useContext, useEffect} from 'react';
import CryptoPreview from './CryptoPrewiew';
import { WatchlistContext } from './WatchlistContext/WatchlistContext';

export default function Watchlist(){
    const {favs, getFavs, handler} = useContext(WatchlistContext);


    useEffect(()=>{
        getFavs();
        // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [handler])
    

    return(

        <div className='watchlist-container'>
            <div>
            <h2>Your personal watchlist</h2>
            </div>
            <table>
                <thead> 
                <tr className='header'>
                    <th>#</th>
                    <th className='name-table'>Name</th>
                    <th>Price</th>
                    <th><p>24h %</p></th>
                    <th><p>Market Cap</p></th>
                    <th><p>Circulating Supply</p></th>
                </tr>
                </thead>
                <tbody>

                
                {favs ?
                favs.map(
                    item => <CryptoPreview crypto={item} key={item.id} watchList='true'/>
                ) : <></>
                }
                </tbody>
            </table>
        </div>
    )
}