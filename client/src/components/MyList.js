import React, { useEffect, useState } from "react";
import './App.css'
import MyCard from './MyCard'

function MyList({purchases, onDeletePurchase}) {

    if (purchases.length === 0) {
        return (
            <div className='list'>
                <h1>My Events</h1>
                <p>There are no events in your list for now. Please purchase tickets.</p>
            </div>
        )
    }

    const sortedPurchases = purchases.sort((a, b) => {
        const dateA = new Date(a.event.date);
        const dateB = new Date(b.event.date);
        return dateA.getTime() - dateB.getTime()
    });

    return (
        <div className='list'>
            <h1>My Events</h1>
            {sortedPurchases.map(purchase => (
                <MyCard key={purchase.id} purchase={purchase} onDeletePurchase={onDeletePurchase}/>
            ))}
        </div>
    )

}

export default MyList