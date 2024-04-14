// About.jsx
import React from 'react';
import galOne from "../images/gallery4.jpg";
import galTwo from "../images/gallery6.jpg";

const About = () => {
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <h1>About Our Guest House</h1>
                    <p>Welcome to our charming guest house nestled in the heart of nature. Our mission is to provide a serene and welcoming retreat for travelers seeking tranquility and relaxation.</p>
                    <p>At our guest house, we strive to create an unforgettable experience for every guest. Whether you're here for a romantic getaway, a family vacation, or a solo adventure, we have something for everyone.</p>
                    <p>Our dedicated staff is committed to ensuring that your stay with us is nothing short of exceptional. From personalized service to luxurious amenities, we go above and beyond to exceed your expectations.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img src={galOne} alt="Guest House Exterior" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2>Our Mission</h2>
                    <p>Our mission is to provide a haven of peace and tranquility where guests can relax, recharge, and reconnect with nature. We believe in creating memorable experiences that leave a lasting impression.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h2>Our Values</h2>
                    <p>At our guest house, we are guided by a set of core values that shape everything we do. These values include:</p>
                    <ul>
                        <li>Exceptional Hospitality</li>
                        <li>Attention to Detail</li>
                        <li>Sustainability and Eco-Friendliness</li>
                        <li>Community Engagement</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <img src={galTwo} alt="Guest House Interior" className="img-fluid" />
                </div>
            </div>
        </div>
    );
};

export default About;
