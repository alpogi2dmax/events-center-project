import React, { useState } from 'react'
import './App.css';

function PurchaseCard({purchase, onUpdatePurchase}) {

    const [number_tickets, setNumber_tickets] = useState(1)
    const [errors, setErrors] = useState([])
    
    function handleDeleteClick() {
        fetch(`/purchases/${purchase.id}`, {
            method: 'DELETE',
        })
        .then((r) => {
            if (r.ok) {
                onUpdatePurchase(); // Pass the purchase ID to the handler
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function handleEditClick() {
        fetch(`/purchases/${purchase.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: purchase.name,
                number_tickets: number_tickets,
                user_id: purchase.user_id,
                event_id: purchase.event_id
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(() => {
                    onUpdatePurchase()
                    alert('Your Purchase has been updated!')
                });
            } else {
                r.json().then((err) => {
                    console.log(err);
                    setErrors([err.error]);
                }
            )}
        })
        
    }


    

    return (
        <div>
            <p>Tickets Purchased: {purchase.number_tickets}</p>
            <div>
                <label for='quantity'>Quantity: </label>
                <input id='quantity' value={number_tickets} onChange={(e) => setNumber_tickets(parseInt(e.target.value))}/>
                <button onClick={handleEditClick}>Edit Purchase</button>
                <button onClick={handleDeleteClick}>Cancel Purchase</button>
            </div>
        </div>
    )
    
}

export default PurchaseCard;


