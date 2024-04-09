
import React from 'react';
import { NavLink } from 'react-router-dom';

import { isUserLoggedIn, logout, isAdminUser, getLoggedInUser } from '../services/AuthService';

import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const isAuth = isUserLoggedIn();
    const isAdmin = isAdminUser();
    const loggedInUsername = getLoggedInUser();

    const navigator = useNavigate();
   
    function handleLogout() {
        logout();
        navigator('/login');
    }

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        <a href='http://localhost:3000' className='navbar-brand'>
                            Guest House
                        </a>
                    </div>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>
                            {isAuth && (
                                <li className='nav-item'>
                                    <p className='text-warning mt-2'>Welcome, {loggedInUsername}!</p>
                                </li>
                            )}
                            {isAuth && isAdmin && (
                                <li className='nav-item'>
                                    <NavLink to="/reservations" className="nav-link">Reservations</NavLink>
                                </li>
                            )}
                            <li className='nav-item'>
                                <NavLink to="/add-reservation" className="nav-link">Make Reservation</NavLink>
                            </li>
                            
                            <li className='nav-item'>
                                <NavLink to="/available-days" className="nav-link">Available Days</NavLink>
                            </li>
                        </ul>
                    </div>
                    <ul className='navbar-nav'>
                        {!isAuth && (
                            <li className='nav-item'>
                                <NavLink to="/register" className="nav-link">Register</NavLink>
                            </li>
                        )}
                        {!isAuth && (
                            <li className='nav-item'>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                        )}
                        {isAuth && (
                            <li className='nav-item'>
                                <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
