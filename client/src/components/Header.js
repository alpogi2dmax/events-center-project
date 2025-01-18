import React from 'react'
import { Link } from 'react-router-dom'

function Header({user, setUser}) {

    return (
        <header>
            <h1 className='headercss'>
                Events Center
            </h1>
            <p>Welcome, {user.full_name}</p>
        </header>
    )
}

export default Header;