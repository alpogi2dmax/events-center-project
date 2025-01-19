import React, { useState } from 'react'
import './App.css';

function MyCard({purchase, onDeletePurchase}) {

    function handleDeleteClick() {
        fetch(`/purchases/${purchase.id}`, {
            method: 'DELETE',
        })
        .then((r) => {
            if (r.ok) {
                // Check if there's a response body before parsing
                return r.text().then(text => text ? JSON.parse(text) : {});
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(() => onDeletePurchase(purchase))
        .catch(error => console.error('Error:', error));
    }

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
                    <h2>Tickets Purchased: {purchase.number_tickets} </h2>
                    <h3>Total Cost: ${(purchase.number_tickets * purchase.event.price).toFixed(2)}</h3>
                    <button onClick={handleDeleteClick}>Cancel Purchase</button>
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
        </div>
    )

}

export default MyCard