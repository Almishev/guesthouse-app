
import React, { useEffect, useState } from 'react'
import {  deleteReservation, getAllReservations  } from '../services/ReservationService'
import { useNavigate } from 'react-router-dom'

const ListReservationComponent = () => {

    const [reservations, setReservations] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        listReservations();
    }, [])
    
    function listReservations(){
        getAllReservations().then((response) => {
            setReservations(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewReservation(){
        navigate('/add-reservation')

    }

    function updateReservation(id){
        console.log(id)
        navigate(`/update-reservation/${id}`)
    }
    
    function removeReservation(id){
        deleteReservation(id).then((response) => {
            listReservations();
        }).catch(error => {
            console.error(error)
        })
    }

   

  return (
    <div className='container'>
        <h2 className='text-center'>List of Reservations</h2>
        <button className='btn btn-primary mb-2' onClick={addNewReservation}>Add Reservation</button>
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>UerName</th>
                        <th>Check-in-date</th>
                        <th>Check-out-date</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Number of adults</th>
                        <th>Number of children</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reservations.map(reservation => 
                            <tr key={reservation.id}>
                                <td>{reservation.username}</td>
                                <td>{reservation.checkInDate}</td>
                                <td>{reservation.checkOutDate}</td>
                                <td>{reservation.email}</td>
                                <td>{reservation.phone}</td>
                                <td>{reservation.numberOfAdults}</td>
                                <td>{reservation.numberOfChildren}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateReservation(reservation.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeReservation(reservation.id)} style={ { marginLeft: "10px" }} >Delete</button>
                                
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>

    </div>
  )
}

export default ListReservationComponent