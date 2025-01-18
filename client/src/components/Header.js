import React from 'react'
import { Link } from 'react-router-dom'

function Header({user, setUser}) {

    function handleLogOutClick() {
        fetch('/logout', { method: 'DELETE' }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        })
    }

    return (
        <div>
            <header>
                <h1 className='headercss'>
                    Events Center
                </h1>
                <p>Welcome, {user.full_name}</p>
            </header>
            <button onClick={handleLogOutClick}>Logout</button>
        </div>
    )
}

export default Header;