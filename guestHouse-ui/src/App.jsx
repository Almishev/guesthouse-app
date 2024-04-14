import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'
import ListReservationComponent from './components/ListReservationComponent'
import AvailableDaysComponent from './components/AvailableDaysComponent'
import ReservationComponent from './components/ReservationComponent'
import ListMessageComponent from './components/ListMessageComponent'
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';

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
              <Route path='/' element = { <Home /> }></Route>

               {/* http://localhost:8080/home */} 
               <Route path='/home' element = { <Home /> }></Route>

                {/* http://localhost:8080/about */} 
                <Route path='/about' element = { <About /> }></Route>

                {/* http://localhost:8080/contact */} 
                <Route path='/contact-us' element = { <ContactUs /> }></Route>
              
               {/* http://localhost:8080/reservations */}
               <Route path='/reservations' element = { 
              <AuthenticatedRoute>
                <ListReservationComponent />
              </AuthenticatedRoute> 
              }></Route>

               {/* http://localhost:8080/add-reservation */}
               <Route path='/add-reservation' element = { 
             
                <ReservationComponent />
             
              }></Route>
               {/* http://localhost:8080/awailable-days */}
               <Route path='/available-days' element = { 
              
                <AvailableDaysComponent />
               
              }></Route>

              <Route path='/messages' element = { <ListMessageComponent /> }></Route>
             
             
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
