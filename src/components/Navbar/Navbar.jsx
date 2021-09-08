import React from 'react';
import {FaUser, FaBitcoin} from 'react-icons/fa';
import {MdKeyboardArrowDown} from 'react-icons/md';
import { Link } from 'react-router-dom';
import SearchNav from './SearchNav';

export default function Navbar(){

    return (
        <div className='nav-container'>
            <nav className='navbar'>
                <div><Link to='/'><FaBitcoin/></Link></div>
                <ul>                    
                    <li><Link to='/'>Cryptocurrencies</Link></li>
                    <li><Link to='/watchlist'>Watchlist</Link></li>
                </ul>
                <ul>
                    <li>
                        <div className='drop-container'>
                            <div className='drop-on'>
                            <FaUser/><MdKeyboardArrowDown/>
                            </div>
                            <div className='drop-menu-user'>
                                <span><Link to='/watchlist'><p>Watchlist</p></Link></span>
                                <span><p>Log out</p></span>
                            </div>
                        </div>
                    </li>
                    <li className='menu-search'><SearchNav/></li>
                </ul>
            </nav>
        </div>
    )
}