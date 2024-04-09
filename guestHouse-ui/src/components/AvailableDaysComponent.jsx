import React, { useState } from 'react';
import { getAvailableDays } from '../services/ReservationService';
import axios from 'axios';

const AvailableDaysComponent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [availableDays, setAvailableDays] = useState([]);
    const [error, setError] = useState('');

    const handleGetAvailableDays = () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end dates.');
            return;
        }

        getAvailableDays(startDate, endDate) 
        .then(response => {
            setAvailableDays(response.data);
            setError('');
        })
            .catch(error => {
                console.error('Error fetching available days:', error);
                setError('An error occurred while fetching available days.');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Check Available Days</h2>
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date:</label>
                                <input type="date" id="startDate" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">End Date:</label>
                                <input type="date" id="endDate" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <button className="btn btn-primary" onClick={handleGetAvailableDays}>Get Available Days</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Available Days:</h2>
                            <ul className="list-group">
                                {availableDays.map((day, index) => (
                                    <li key={index} className="list-group-item">{day}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableDaysComponent;
