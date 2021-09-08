import React,{useState, useEffect} from 'react';
import CryptoPreview from './CryptoPrewiew';

export default function Trending(){

    const API = 'https://api.coingecko.com/api/v3/search/trending';
    const API_coin = 'https://api.coingecko.com/api/v3/coins/';
    const [trends, setTrends] = useState([]);
    const [trendsList, setTrendsList] = useState([]);

    async function getTrend(){
        const respuesta = await fetch(API);
        const res = await respuesta.json();
        console.log('res',res.coins)
        res.coins.map(
            item => getCoindData(item)
        )
        /*
        .map(
            item =>{                 
                getCoindData(item)
                }
            )
        */
    }

    async function getCoindData(coin){
        const respuesta = await fetch(API_coin + coin.item.id)
        const res = await respuesta.json();
        setTrendsList([...trendsList,res]);
        
    }

    useEffect(()=>{
        getTrend();
    },[])

    return(
        <div className='top-list-container'>
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
                {trendsList?
                    trendsList.map(
                        item => <CryptoPreview crypto={item} isTrend={true}/>
                    ) : <></>
                }
                </tbody>
                
            </table>
           
        </div>
    )
}