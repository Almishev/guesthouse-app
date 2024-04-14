
import React, { useState } from 'react';
import { registerAPICall } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../images/about.jpg';

const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    function handleRegistrationForm(e) {
        e.preventDefault();
        const register = { name, username, email, password };
        registerAPICall(register).then(response => {
            navigator("/login");
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='container mt-5 mb-5' style={{ backgroundImage: `url(${backgroundImg})`, height: '700px' }}>
            <div className='row'>
             <div className='col-md-12'> 
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>User Registration Form</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input type='text' className='form-control' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Username</label>
                                    <input type='text' className='form-control' placeholder='Enter username' value={username} onChange={e => setUsername(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type='text' className='form-control' placeholder='Enter email address' value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input type='password' className='form-control' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <button className='btn btn-primary btn-block' onClick={handleRegistrationForm}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            --
        </div>
    );
};

export default RegisterComponent;
