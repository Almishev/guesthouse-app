import React, { useEffect, useState } from 'react';
import { saveReservation, updateReservation } from '../services/ReservationService';
import { useNavigate, useParams } from 'react-router-dom';

const ReservationComponent = () => {
    const [username, setUsername] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [numberOfAdults, setNumberOfAdults] = useState('');
    const [numberOfChildren, setNumberOfChildren] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if check-in date is not before today
        const today = new Date();
        if (new Date(checkInDate) < today) {
            alert('Check-in date cannot be before today.');
            return;
        }

        // Check if check-out date is at least 1 day after check-in date
        const checkOut = new Date(checkOutDate);
        const checkIn = new Date(checkInDate);
        const oneDayMilliseconds = 1000 * 60 * 60 * 24;
        if (checkOut - checkIn < oneDayMilliseconds) {
            alert('Check-out date must be at least 1 day after check-in date.');
            return;
        }

        const reservation = { username, checkInDate, checkOutDate, email, phone, numberOfAdults, numberOfChildren };

        if (id) {
            updateReservation(id, reservation)
                .then(() => navigate('/reservations'))
                .catch(error => console.error(error));
        } else {
            saveReservation(reservation)
                .then(() => navigate('/reservations'))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{id ? 'Update Reservation' : 'Add Reservation'}</h2>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Username:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter username'
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Chek in date:</label>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Enter check in date'
                                name='checkInDate'
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Chek out date:</label>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Enter check out date'
                                name='checkOutDate'
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Phone:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter phone'
                                name='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Adults:</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Enter num of adults'
                                name='numberOfAdults'
                                value={numberOfAdults}
                                onChange={(e) => setNumberOfAdults(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Nummber of children:</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Enter number of children'
                                name='numberOfChildren'
                                value={numberOfChildren}
                                onChange={(e) => setNumberOfChildren(e.target.value)}
                            >
                            </input>
                        </div>

                            <button className='btn btn-success' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationComponent;
