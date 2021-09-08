import React, {createContext, useState, useEffect} from 'react';

export const WatchlistContext = createContext();

export function WatchlistContextProvider({children}){    

    const [favs, setFavs] = useState([]);
    const [handler, setHandler] = useState(0);
    
    const getFavs = ()=>{
        setFavs(JSON.parse(localStorage.getItem('CryptoWatchlist')));
    }

    const addToWatchlist = ({crypto})=>{
        const favsLocal = JSON.parse(localStorage.getItem('CryptoWatchlist'));
        setHandler(handler+1);
        if(favsLocal){
            localStorage.setItem('CryptoWatchlist', JSON.stringify([...favsLocal,crypto]));
        } else{
            localStorage.setItem('CryptoWatchlist', JSON.stringify([crypto]));
        }
    }

    const removeFromWatchlist = (crypto)=>{
        localStorage.setItem('CryptoWatchlist', JSON.stringify(favs.filter(item => item.id !== crypto.id)));
        setHandler(handler-1);
    }

    const isInWatchlist = (crypto)=>{
        let coincidence = favs.filter(item => item.id === crypto.id);
        if(coincidence.length){
            return true;
        } else{
            return false;
        }
    }


    useEffect(()=>{
        getFavs();
    },[])

    return(
        <WatchlistContext.Provider value={{addToWatchlist, removeFromWatchlist, isInWatchlist, favs, getFavs, handler}}>
            {children}
        </WatchlistContext.Provider>
    )
}
