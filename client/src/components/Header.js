import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './App.css';

function Header({user, setUser}) {

    const [hoveredLink1, setHoveredLink1] = useState(false);
    const [hoveredLink2, setHoveredLink2] = useState(false);
    const [hoveredLink3, setHoveredLink3] = useState(false);

    function handleLogOutClick() {
        fetch('/logout', { method: 'DELETE' }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        })
    }

    const handleMouseOver1 = () => {
        setHoveredLink1(true);
    };

    const handleMouseOut1 = () => {
        setHoveredLink1(false);
    };

    const handleMouseOver2 = () => {
        setHoveredLink2(true);
    };

    const handleMouseOut2 = () => {
        setHoveredLink2(false);
    };

    const handleMouseOver3 = () => {
        setHoveredLink3(true);
    };

    const handleMouseOut3 = () => {
        setHoveredLink3(false);
    };

    return (
        <div className='logincss'>
            <header className='headercss'>
                <h1>
                    Events Center
                </h1>
            </header>
            <nav className='navbar'>
                <h4 className='nav-link'>Welcome, {user.full_name}</h4>
                <Link
                    className={hoveredLink1 ? 'nav-link-2' : 'nav-link'}
                    to='/mylist'
                    onMouseOver={handleMouseOver1}
                    onMouseOut={handleMouseOut1}
                >My List</Link>
                <Link
                    className={hoveredLink2 ? 'nav-link-2' : 'nav-link'}
                    to='/'
                    onMouseOver={handleMouseOver2}
                    onMouseOut={handleMouseOut2}
                >Events List</Link>
                <button 
                    className={hoveredLink3 ? 'nav-link-2' : 'nav-link'}
                    onClick={handleLogOutClick}
                    onMouseOver={handleMouseOver3}
                    onMouseOut={handleMouseOut3}
                    >Logout
                </button>
            </nav>
                
        </div>
    )
}

export default Header;