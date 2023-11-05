import React, { useEffect, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
    const [data, setData] = useState([]);
    

    useEffect(() => {
        fetch('image.json')
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }, []);
    return (
        <div>
            <h1>Hello world</h1>
            <div className='imageCal'>
                {
                    data.map((item, index) => (
                        <div key={index} className={`individual  ${index === 0 ? 'large' : ''}`}>
                            <img className='imageSize' src={item.image} alt="" />
                            <div className="layout">
                                
                            </div>

                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Gallery;
