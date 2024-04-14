import React from 'react';
import { NavLink } from 'react-router-dom';

const FooterComponent = () => {
    return (
        <footer className="footer mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h6 className='mt-2'>Къща за гости "Далеч от морето"</h6>
                        <p>Село Ковачевица, 0877382224</p>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-unstyled mt-4">
                        <li><NavLink to="/available-days" style={{ color: 'white', textDecoration: 'none' }}>Available Days</NavLink></li>
                            <li><NavLink to="/add-reservation" style={{ color: 'white', textDecoration: 'none' }}>Make Reservation</NavLink></li>
                            
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <p className='mt-4' style={{ color: 'white' }}>Developed by Anton Almishev</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
