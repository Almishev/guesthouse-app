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
        navigator('/home');
    }

    return (
        <header style={{ height: '40px' }}>
            <nav className='navbar navbar-expand-md navbar-dark bg-primary'>
                <div className='ml-4'>
                    <NavLink to='/' className='navbar-brand' style={{ fontSize: '24px', fontWeight: 'bold' }}>Guest House</NavLink>
                </div>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <NavLink to="/home" className="nav-link" style={{ fontSize: '18px', fontWeight: 'bold' }}>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/about" className="nav-link" style={{ fontSize: '18px', fontWeight: 'bold' }}>About</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/contact-us" className="nav-link" style={{ fontSize: '18px', fontWeight: 'bold' }}>Contact Us</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBooking" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Booking
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownBooking" style={{ background: '#00bfff' }}>
                                <NavLink to="/add-reservation" className="dropdown-item text-primary" style={{ background: '#87CEFA', fontSize: '18px', fontWeight: 'bold' }}>Make Reservation</NavLink>
                                <NavLink to="/available-days" className="dropdown-item text-primary" style={{ background: '#87CEFA', fontSize: '18px', fontWeight: 'bold' }}>Available Days</NavLink>
                
                                {isAdmin && (
                                    <NavLink to="/reservations" className="dropdown-item text-primary" style={{ background: '#87CEFA', fontSize: '18px', fontWeight: 'bold' }}>Reservations</NavLink>
                                   
                                )}
                                 {isAdmin && (
                                 <NavLink to="/messages" className="dropdown-item text-primary" style={{ background: '#87CEFA', fontSize: '18px', fontWeight: 'bold' }}>Messages</NavLink>
                                     
                                )}
                                 </div>
                        </li>
                    </ul>
                    <ul className='navbar-nav ml-auto'>
                        {!isAuth && (
                            <>
                                <li className='nav-item'>
                                    <NavLink to="/register" className="nav-link" style={{ fontSize: '18px', fontWeight: 'bold' }}>Register</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to="/login" className="nav-link" style={{ fontSize: '18px', fontWeight: 'bold' }}>Login</NavLink>
                                </li>
                            </>
                        )}
                        {isAuth && (
                            <li className='nav-item mt-2'>
                                <button className='btn btn-link nav-link' onClick={handleLogout} style={{ fontSize: '18px', fontWeight: 'bold' }}>Logout</button>
                            </li>
                        )}
                        {isAuth && (
                            <li className='nav-item'>
                                <p className='mt-3 text-white' style={{ fontSize: '18px', fontWeight: 'bold' }}>Welcome, {loggedInUsername}!</p>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;


