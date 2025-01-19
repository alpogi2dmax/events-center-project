import React, { useEffect, useState } from "react";
import EventCard from './EventCard'

function EventList({user, onAddPurchase}) {

    const [events, setEvents] = useState([])
    
      useEffect(() => {
        fetch('/events')
        .then(r => r.json())
        .then(data => setEvents(data))
      }, [])

      const sortedEvents = events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    return (
        <div className='list'>
            {sortedEvents.map(event => (
                <EventCard key={event.id} event={event} user={user} onAddPurchase={onAddPurchase}/>
            ))}
        </div>
    )

}

export default EventList