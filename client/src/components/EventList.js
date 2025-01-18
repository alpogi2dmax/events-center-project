import React from 'react'
import EventCard from './EventCard'

function EventList({events}) {

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