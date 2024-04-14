import React, { useState, useEffect } from 'react';
import { saveMessage } from '../services/MessageService';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveMessage(formData)
            .then(response => {
                console.log('Message saved successfully:', response.data);
                setSuccessMessage('Вашето съобщение беше успешно изпратено.');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: ''
                });
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);
            })
            .catch(error => {
                console.error('Error saving message:', error);
                // Handle error appropriately, e.g., show error message to user
            });
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you! Whether you have questions about our guest house, want to inquire about availability, or simply want to say hello, feel free to reach out to us using the contact information below.</p>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-6">
                    <h2>Contact Information</h2>
                    <ul>
                        <li><strong>Address:</strong> 123 Main Street, City, Country</li>
                        <li><strong>Phone:</strong> +123-456-7890</li>
                        <li><strong>Email:</strong> info@example.com</li>
                    </ul>
                </div>
                <div className="col-md-6 mb-5">
                    <h2>Contact Form</h2>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form className='mb-5' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Your Phone</label>
                            <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mb-5">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
