import React, { useEffect, useState } from "react";
import MyCard from './MyCard'

function MyList({purchases, onDeletePurchase}) {

    if (purchases.length === 0) {
        return (
            <p>There are no events in your list for now. Please purchase tickets.</p>
        )
    }

    const sortedPurchases = purchases.sort((a, b) => {
        const dateA = new Date(a.event.date);
        const dateB = new Date(b.event.date);
        return dateA.getTime() - dateB.getTime()
    });

    return (
        <div className='list'>
            {sortedPurchases.map(purchase => (
                <MyCard key={purchase.id} purchase={purchase} onDeletePurchase={onDeletePurchase}/>
            ))}
        </div>
    )

}

export default MyList