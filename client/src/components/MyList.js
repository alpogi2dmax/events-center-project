import React, { useEffect, useState } from "react";
import './App.css';
import MyCard from './MyCard';

function MyList() {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);

    // Define a function to fetch session data
    const fetchSessionData = () => {
        fetch('/checksession')
        .then((r) => r.ok ? r.json() : Promise.reject('Failed to load'))
        .then((userData) => {
            if (userData) {
                setUser(userData[0]);
                setEvents(userData[0].events || []);
            }
        })
        .catch((error) => console.error("Fetch error:", error));
    };

    useEffect(() => {
        fetchSessionData();
    }, []);

    function handleDeletePurchase() {
        // Re-fetch the data to update the state
        fetchSessionData();
    }

    if (events.length === 0 || events === null) {
        return (
            <h2 className="list">There are no events in your list. Please add events.</h2>
        )
    }

    // const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className='list'>
            <h1>My Events</h1>
            {events.map(event => (
                <MyCard key={event.id} event={event} onDeletePurchase={handleDeletePurchase} />
            ))}
        </div>
    );
}

export default MyList;