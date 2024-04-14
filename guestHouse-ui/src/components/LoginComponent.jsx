// LoginComponent.jsx
import React, { useState } from 'react';
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../images/about.jpg';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    async function handleLoginForm(e) {
        e.preventDefault();
        await loginAPICall(username, password).then(response => {
            const token = 'Bearer ' + response.data.accessToken;
            const role = response.data.role;
            storeToken(token);
            saveLoggedInUser(username, role);
            navigator("/home");
            window.location.reload(false);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='container mt-5'  style={{ backgroundImage: `url(${backgroundImg})` , height: '700px' }}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>Login Form</h2>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Username or Email</label>
                                    <input type='text' className='form-control' placeholder='Enter username' value={username} onChange={e => setUsername(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input type='password' className='form-control' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <button className='btn btn-primary btn-block' onClick={handleLoginForm}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
