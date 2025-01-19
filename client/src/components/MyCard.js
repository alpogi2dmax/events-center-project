import React, { useState } from 'react'
import './App.css';

function MyCard({purchase}) {

    return (
        <div>
            <div className='card'>
                <div className='box'>
                    <p>{purchase.event.date.split(' ')[0]}</p>
                </div>
                <div className='box'>
                    <img className='image' src={purchase.event.image} alt={purchase.event.name}/> 
                </div>
                <div className='box'>
                    <h2>{purchase.event.name}</h2>
                    <h3>{purchase.event.venue}</h3>
                    <p>{purchase.event.city} {purchase.event.state}</p>
                    <p>${purchase.event.price.toFixed(2)}</p>
                </div>
                <div className='box'>
                    <h3>{purchase.number_tickets} Tickets</h3>
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
        </div>
    )

}

export default MyCard