import React, { useState, useEffect } from 'react';
import aboutImage from "../images/room-1.jpg";
import homeOne from "../images/room-2.jpg";
import homeTwo from "../images/room-3.jpg";
import { getAllContents, updateContent } from '../services/ContentService'; 
import Carousel from 'react-bootstrap/Carousel';
import { isAdminUser } from '../services/AuthService'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

    const [contents, setContents] = useState([]);
    const isAdmin = isAdminUser();

    useEffect(() => {   
        fetchContents();
    }, []);

    const fetchContents = async () => {
        try {
            const response = await getAllContents();
            setContents(response.data);
        } catch (error) {
            console.error('Error fetching contents:', error);
        }
    };

    const handleEditContent = async (id, field, newValue) => {
        try {
            const contentToUpdate = contents.find(content => content.id === id);
            if (!contentToUpdate) return;
    
            contentToUpdate[field] = newValue;
    
            await updateContent(id, contentToUpdate);
    
            fetchContents();
        } catch (error) {
            console.error('Error updating content:', error);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <h1>Welcome to Our Guest House</h1>
                    <p>Escape to a charming guest house nestled in the heart of nature. Our guest house offers a serene retreat for travelers seeking tranquility and relaxation. With picturesque surroundings and warm hospitality, your stay with us will be nothing short of magical.</p>
                </div>
            </div>
            <Carousel>
            <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={aboutImage}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Experience Comfort and Luxury</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={homeOne}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Explore the Natural Beauty</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={homeTwo}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Another Beautiful Image</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="row mt-5">
                {contents.map((content) => (
                    <div key={content.id} className="col-md-6">
                        <h2 
                            onDoubleClick={() => isAdmin && handleEditContent(content.id, 'title', prompt(`Enter new value for title:`, content.title))}
                        >
                            {content.title}
                        </h2>
                        <p 
                            onDoubleClick={() => isAdmin && handleEditContent(content.id, 'text', prompt(`Enter new value for text:`, content.text))}
                        >
                            {content.text}
                        </p>
                    </div>
                ))}
            </div>

            <div className="parallax">
                <div className="parallax-content">
                    <ul className="social-icons">
                    <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href="tel:0877382224"><FontAwesomeIcon icon={faPhone} /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
