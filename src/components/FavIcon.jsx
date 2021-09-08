import React,{useContext} from "react";
import {MdStarBorder, MdStar} from 'react-icons/md';
import { WatchlistContext } from "./WatchlistContext/WatchlistContext";

export default function FavIcon({isFav, setIsFav, crypto}){

    const {addToWatchlist, removeFromWatchlist} = useContext(WatchlistContext);
    
    function addFav(){
        addToWatchlist({crypto});
        setIsFav(true);
    }

    function removeFav(){
        removeFromWatchlist(crypto);
        setIsFav(false);
    }

    return (
        <div>
            { !isFav ? <div className='drop-watchlist'><MdStarBorder onClick={addFav}/><p className='drop-warning'>Add to Watchlist</p></div> : <MdStar className='isFav'  onClick={removeFav}/>}
        </div>
    )
}