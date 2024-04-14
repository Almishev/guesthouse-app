import React, { useState } from 'react';
import { saveReservation, updateReservation } from '../services/ReservationService';
import { useNavigate, useParams, NavLink  } from 'react-router-dom';
import backgroundImg from '../images/about.jpg';



const ReservationComponent = () => {
    const [username, setUsername] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [numberOfAdults, setNumberOfAdults] = useState('');
    const [numberOfChildren, setNumberOfChildren] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if check-in date is not before today
        const today = new Date();
        if (new Date(checkInDate) < today) {
            setErrorMessage('Check-in date cannot be before today.');
            return;
        }

        // Check if check-out date is at least 1 day after check-in date
        const checkOut = new Date(checkOutDate);
        const checkIn = new Date(checkInDate);
        const oneDayMilliseconds = 1000 * 60 * 60 * 24;
        if (checkOut - checkIn < oneDayMilliseconds) {
            setErrorMessage('Check-out date must be at least 1 day after check-in date.');
            return;
        }

        const reservation = { username, checkInDate, checkOutDate, email, phone, numberOfAdults, numberOfChildren };

        if (id) {
            updateReservation(id, reservation)
                .then(() => {
                    setSuccessMessage('Reservation updated successfully.');
                    navigate('/reservations');
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage('An error occurred while updating the reservation.');
                });
        } else {
            saveReservation(reservation)
                .then(() => {
                    setSuccessMessage('Reservation created successfully.');
                    setTimeout(() => {
                        navigate('/home');
                    }, 6000);
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage('An error occurred while creating the reservation.');
                });
        }
    };

    return (
        <div className='container' style={{ backgroundImage: `url(${backgroundImg})` , height: '700px' }}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card mt-5'>
                        <div className='card-header'>
                            <h2 className='text-center'>{id ? 'Update Reservation' : 'Add Reservation'}</h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label>Username:</label>
                                    <input type='text' className='form-control' value={username} onChange={e => setUsername(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Check-in Date:</label>
                                    <input type='date' className='form-control' value={checkInDate} onChange={e => setCheckInDate(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Check-out Date:</label>
                                    <input type='date' className='form-control' value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Email:</label>
                                    <input type='text' className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Phone:</label>
                                    <input type='text' className='form-control' value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Number of Adults:</label>
                                    <input type='number' className='form-control' value={numberOfAdults} onChange={e => setNumberOfAdults(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Number of Children:</label>
                                    <input type='number' className='form-control' value={numberOfChildren} onChange={e => setNumberOfChildren(e.target.value)} />
                                </div>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </form>
                            {!errorMessage && !successMessage && (
                                <div className="mt-3">
                                    <p>Check available days before  making a reservation. <NavLink to="/available-days">Available Days</NavLink>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationComponent;
