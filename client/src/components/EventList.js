import React, { useEffect, useState } from "react";
import EventCard from './EventCard'

function EventList() {

    const [events, setEvents] = useState([])
    
      useEffect(() => {
        fetch('/events')
        .then(r => r.json())
        .then(data => setEvents(data))
      }, [])
    
      console.log(events)

    return (
        <div className='list'>
            {events.map(event => (
                <EventCard key={event.id} event={event}/>
            ))}
        </div>
    )

}

export default EventList