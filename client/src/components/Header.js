import React from 'react'
import { Link } from "react-router-dom";
import './App.css';

function Header({user, setUser}) {

    function handleLogOutClick() {
        fetch('/logout', { method: 'DELETE' }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        })
    }

    return (
        <div className='logincss'>
            <header className='headercss'>
                <h1>
                    Events Center
                </h1>
            </header>
            <nav className='navbar'>
                <h3 className='nav-link'>Welcome, {user.full_name}</h3>
                <Link className='nav-link' to='/'>Events List</Link>
                <Link className='nav-link' to='/mylist'>My List</Link>
                <button className='nav-link' onClick={handleLogOutClick}>Logout</button>
            </nav>
                
        </div>
    )
}

export default Header;