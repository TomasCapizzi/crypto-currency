import React, {useState, useEffect} from "react";
import {BiSearch} from 'react-icons/bi';
import { Link } from "react-router-dom";

export default function SearchNav(){

    const [coins, setCoins] = useState([])
    const [results, setResults] = useState(false);
    const [filter, setFilter] = useState()
    const resultsDisplay = document.getElementById('results');
    let termInput = document.getElementById('term-input');


    results && resultsDisplay.classList.add('on');

    const searchCrypto = (term)=>{
        if(term.length > 2){
            const busqueda = coins.filter(coin => 
                coin.name.toLowerCase().includes(term) |
                coin.symbol.includes(term)
            )
            console.log(busqueda)
            setFilter(busqueda)
            setResults(true)
        }else if(term.length <= 2 && results) {
            setResults(false);
            resultsDisplay.classList.remove('on');
        }    
    }

    async function getList(){
        const respuesta = await fetch('https://api.coingecko.com/api/v3/coins/list');
        const res = await respuesta.json();
        setCoins(res)
    }

    function clearInput(){
        termInput.value = '';
        setResults(false);
        resultsDisplay.classList.remove('on');
    }

    useEffect(()=>{
        getList();
        setResults(false);
    },[])

    return(
        <div className='search-container'>
            <div>
                <input type="text" id='term-input' onChange={e => searchCrypto(e.target.value)}/><BiSearch/>
            </div>
            <div className='results-container' id='results'>
                <p>Scroll down</p>
                {filter && filter.map(
                    coin => <Link to={'/currency/' + coin.id} onClick={clearInput}><h5>{coin.name}</h5></Link>
                )}
            </div>
        </div>
    )
}