import React, {useEffect, useContext, useState} from 'react';
import { useParams } from 'react-router';
import FavIcon from './FavIcon';
import { WatchlistContext } from './WatchlistContext/WatchlistContext';
import {AiOutlineLink} from 'react-icons/ai';
import {FaTelegramPlane, FaTwitter} from 'react-icons/fa'

export default function Detail(){
    const {id} = useParams();
    const url = `https://api.coingecko.com/api/v3/coins/${id}`

    const [crypto, setCrypto] = useState();

    const {isInWatchlist} = useContext(WatchlistContext);
    const [isFav, setIsFav] = useState();

    const [links, setLinks] = useState();
    const [platforms, setPlatforms] = useState();


    async function getData(){
        const respuesta = await fetch(url);
        const res = await respuesta.json();
        console.log(res);
        setIsFav(isInWatchlist(res));
        setCrypto(res);
        setLinks(res.links);
        setPlatforms(res.platforms)        
    }

    useEffect(()=>{
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    return(
        <div>
            {crypto ?
            <div className='detail-container'>
                <div className='detail'>
                    <div className='detail-wrapper'>                        
                    
                    <div className='data-container'>
                        <div className='data-sec'>
                            <p>Rank #{crypto.market_cap_rank}</p>
                            <p>{crypto.symbol.toUpperCase()}</p>
                        </div>
                        <div className='data-principal'>
                            <h2>{crypto.name}</h2>
                            <img src={crypto.image.thumb} alt="crypto icon" />                            
                        </div>
                    </div>
                    <div className='price-container'>
                        <h3>${crypto.market_data.current_price.usd}</h3>
                        <p className={crypto.market_data.price_change_percentage_24h < 0 ? 'priceDown-detail' : 'priceUp-detail'}>{crypto.market_data.price_change_percentage_24h} %</p>
                        <FavIcon isFav={isFav} setIsFav={setIsFav} crypto={crypto} comesFromId={true} />
                    </div>
                    <div className='info-container'>                        
                        {platforms ?
                            <div className='contract'>
                                <h3>Contract Ethereum Red</h3>
                                {platforms.ethereum && <p>{platforms.ethereum}</p>}
                            </div>
                        : <></>
                        }
                        {links ?
                            <div className='links'>
                                <h3>Links <AiOutlineLink/></h3>
                                {links.homepage && <p><a href={links.homepage[0]} target='_blank' rel="noreferrer">{links.homepage[0]}</a></p>}
                                {links.twitter_screen_name && <a href={'https://twitter.com/' + links.twitter_screen_name} rel="noreferrer" target='_blank'><FaTwitter/></a>}
                                {links.telegram_channel_identifier && <a href={'https://t.me/' + links.telegram_channel_identifier} rel="noreferrer" target='_blank' ><FaTelegramPlane/></a>}
                            </div> : <></>
                        }
                    </div>
                    </div>
                    <div className='description'>
                        <h3>Description</h3>
                        <p>{crypto.description.en}</p> 
                    </div>
                 
                </div>
            </div>

            : <></>}
        </div>
    )
}

/*
                                        
                  
                    
                    
                    
                    
*/