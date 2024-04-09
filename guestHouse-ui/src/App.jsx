import { useState } from 'react'
import './App.css'

import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'
import ListReservationComponent from './components/ListReservationComponent'
import AvailableDaysComponent from './components/AvailableDaysComponent'
import ReservationComponent from './components/ReservationComponent'

function App() {

  function AuthenticatedRoute({children}){

    const isAuth = isUserLoggedIn();

    if(isAuth) {
      return children;
    }

    return <Navigate to="/" />

  }

  return (
    <>
    <BrowserRouter>
        <HeaderComponent />
          <Routes>
              {/* http://localhost:8080 */}
              <Route path='/' element = { <AvailableDaysComponent /> }></Route>
              
               {/* http://localhost:8080/reservations */}
               <Route path='/reservations' element = { 
              <AuthenticatedRoute>
                <ListReservationComponent />
              </AuthenticatedRoute> 
              }></Route>

               {/* http://localhost:8080/add-reservation */}
               <Route path='/add-reservation' element = { 
              <AuthenticatedRoute>
                <ReservationComponent />
              </AuthenticatedRoute> 
              }></Route>
               {/* http://localhost:8080/awailable-days */}
               <Route path='/available-days' element = { 
              <AuthenticatedRoute>
                <AvailableDaysComponent />
              </AuthenticatedRoute> 
              }></Route>
             
             
               {/* http://localhost:8080/register */}
              <Route path='/register' element = { <RegisterComponent />}></Route>

               {/* http://localhost:8080/login */}
               <Route path='/login' element = { <LoginComponent /> }></Route>

          </Routes>
        <FooterComponent />
        </BrowserRouter>
    </>
  )
}

export default App
