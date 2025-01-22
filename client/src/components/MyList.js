// import React, { useEffect, useState } from "react";
// import './App.css'
// import MyCard from './MyCard'

// function MyList({ events }) {

//     const [user, setUser] = useState(null);
//     const [events1, setEvents1] = useState([])

//     useEffect(() => {
//         fetch('/checksession')
//         .then((r) => {
//             if (r.ok) {
//                 return r.json(); // Attempt to parse JSON directly
//             } else {
//             console.warn("Response was not ok");
//             return null;
//             }
//         })
//         .then((userData) => {
//             if (userData) {
//             setUser(userData[0]);
//             setEvents1(userData[0].events || []); // Use an empty array if no events
//         } else {
//             console.warn("No user data returned from /checksession");
//         }
//         })
//         .catch((error) => console.error("Fetch error:", error));
//     }, []);

//     function reLoad() {

//     }

//     // if (!user.events || user.events.length === 0) {
//     //     return (
//     //         <div className='list'>
//     //             <h1>My Events</h1>
//     //             <p>There are no events in your list for now. Please purchase tickets.</p>
//     //         </div>
//     //     );
//     // }

//     console.log(user)

    



//     const sortedEvents = (events1.sort((a, b) => {
//         const dateA = new Date(a.date);
//         const dateB = new Date(b.date);
//         return dateA.getTime() - dateB.getTime()
//     }))

//     return (
//         <div className='list'>
//             <h1>My Events</h1>
//             {sortedEvents.map(event => (
//                 <MyCard key={event.id} event={event} />
//             ))}
//         </div>
//     )

// }

// export default MyList

import React, { useEffect, useState } from "react";
import './App.css';
import MyCard from './MyCard';

function MyList() {
    const [user, setUser] = useState(null);
    const [events1, setEvents1] = useState([]);

    // Define a function to fetch session data
    const fetchSessionData = () => {
        fetch('/checksession')
        .then((r) => r.ok ? r.json() : Promise.reject('Failed to load'))
        .then((userData) => {
            if (userData) {
                setUser(userData[0]);
                setEvents1(userData[0].events || []);
            }
        })
        .catch((error) => console.error("Fetch error:", error));
    };

    useEffect(() => {
        fetchSessionData();
    }, []);

    function handleDeletePurchase(deletedPurchaseId) {
        // Re-fetch the data to update the state
        fetchSessionData();
    }

    const sortedEvents = events1.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className='list'>
            <h1>My Events</h1>
            {sortedEvents.map(event => (
                <MyCard key={event.id} event={event} onDeletePurchase={handleDeletePurchase} />
            ))}
        </div>
    );
}

export default MyList;