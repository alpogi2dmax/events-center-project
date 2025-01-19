import React, { useEffect, useState } from "react";
import MyCard from './MyCard'

function MyList({purchases}) {

    return (
        <div className='list'>
            {purchases.map(purchase => (
                <MyCard key={purchase.id} purchase={purchase}/>
            ))}
        </div>
    )

}

export default MyList