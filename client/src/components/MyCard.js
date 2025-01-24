import React, { useState } from 'react'
import PurchaseCard from './PurchaseCard';
import './App.css';

function MyCard({event, onUpdatePurchase}) {

    return (
        <div>
            <div className='card'>
                <div className='box'>
                    <p>{event.date.split(' ')[0]}</p>
                </div>
                <div className='box'>
                    <img className='image' src={event.image} alt={event.name}/> 
                </div>
                <div className='box'>
                    <h2>{event.name}</h2>
                    <h3>{event.venue}</h3>
                    <p>{event.city} {event.state}</p>
                    <p>${event.price.toFixed(2)}</p>
                </div>
                <div className='box'>
                    {event.purchases.map(purchase => (
                        <PurchaseCard purchase={purchase} onUpdatePurchase={onUpdatePurchase}/>
                    ))}
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
        </div>
    )

}

export default MyCard

