import React from 'react';
import CryptoPreview from './CryptoPrewiew';

export default function TopList({list}){

    return (
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
                {
                list.map(
                    item => <CryptoPreview crypto={item} key={item.id} />
                )
                }
                </tbody>
                
            </table>
        </div>
    )
}