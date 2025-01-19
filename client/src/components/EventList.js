import React, { useEffect, useState } from "react";
import EventCard from './EventCard'

function EventList({user, onAddPurchase}) {

    const [events, setEvents] = useState([])
    
      useEffect(() => {
        fetch('/events')
        .then(r => r.json())
        .then(data => setEvents(data))
      }, [])

    return (
        <div className='list'>
            {events.map(event => (
                <EventCard key={event.id} event={event} user={user} onAddPurchase={onAddPurchase}/>
            ))}
        </div>
    )

}

export default EventList