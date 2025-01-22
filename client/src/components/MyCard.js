import React, { useState } from 'react'
import PurchaseCard from './PurchaseCard';
import './App.css';

function MyCard({event, onDeletePurchase}) {

    const [purchases, setPurchases] = useState(event.purchases)

    // function handleDeleteClick(purchase_id) {
    //     fetch(`/purchases/${purchase_id}`, {
    //         method: 'DELETE',
    //     })
    //     .then((r) => {
    //         if (r.ok) {
    //             // Check if there's a response body before parsing
    //             return r.text().then(text => text ? JSON.parse(text) : {});
    //         } else {
    //             throw new Error('Network response was not ok.');
    //         }
    //     })
    //     .then((purchase) => console.log(purchase))
    //     .catch(error => console.error('Error:', error));
    // }

    // function deletePurchase(deletedPurchase) {
    //     console.log(deletedPurchase)
    //     setPurchases(purchases.filter(purchase => purchase.id !== deletedPurchase.id))
    // }


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
                        <PurchaseCard purchase={purchase} onDeletePurchase={onDeletePurchase}/>
                    ))}
                    {/* <h2>Tickets Purchased: {purchase.number_tickets} </h2>
                    <h3>Total Cost: ${(purchase.number_tickets * purchase.event.price).toFixed(2)}</h3>
                    <button onClick={handleDeleteClick}>Cancel Purchase</button> */}
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
        </div>
    )

}

export default MyCard

