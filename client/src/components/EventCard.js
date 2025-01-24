import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import './App.css';

function EventCard({event, user, onDeleteEvent }) {

    const [number_tickets, setNumber_tickets] = useState(1)
    const history = useHistory()

    const name = `${user.username}+${event.name}`
    const event_id = event.id
    const user_id = user.id

    function handlePurchaseClick() {
        fetch('/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                number_tickets,
                user_id,
                event_id
            }),
        })
            .then((r) => r.json())
            .then((purchase) => {
              console.log(purchase)
              history.push('/mylist')
            })
    }

    function handleDeleteClick() {
        console.log(onDeleteEvent)
        fetch(`/events/${event.id}`, {
            method: 'DELETE',
        })
        .then((r) => {
            if (r.ok) {
                onDeleteEvent(event);
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
    

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
                <div>
                    <h3>Purchase Tickets</h3>
                    <label for='quantity'>Quantity: </label>
                    <input id='quantity' value={number_tickets} onChange={(e) => setNumber_tickets(parseInt(e.target.value))}/>
                    <button onClick={handlePurchaseClick}>Purchase Tickets</button>
                    <button onClick={handleDeleteClick}>Cancel Event</button>
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
        </div>
    )

}

export default EventCard