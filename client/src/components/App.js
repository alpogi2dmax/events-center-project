import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import EventList from './EventList'

function App() {
  

  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('/events')
    .then(r => r.json())
    .then(data => setEvents(data))
  }, [])

  console.log(events)

  return (
    <div>
      <header>
        <h1>Events Center</h1>
      </header>
      <EventList events={events}/>
    </div>
  )

}



export default App
