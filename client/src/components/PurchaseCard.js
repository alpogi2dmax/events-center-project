import React, { useState } from 'react'
import './App.css';

function PurchaseCard({purchase, onDeletePurchase}) {

    
    function handleDeleteClick() {
        fetch(`/purchases/${purchase.id}`, {
            method: 'DELETE',
        })
        .then((r) => {
            if (r.ok) {
            onDeletePurchase(); // Pass the purchase ID to the handler
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <p>Tickets Purchased: {purchase.number_tickets}</p>
            <button onClick={handleDeleteClick}>Cancel Purchase</button>
        </div>
    )
    
}

export default PurchaseCard;


