import React, { useEffect, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const handleDeleteSelected = () => {
        const newData = data.filter((_, index) => !checkedItems[index]);
        setData(newData);
        setCheckedItems(Array(newData.length).fill(false));
    };

    useEffect(() => {
        fetch('image.json')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setCheckedItems(Array(data.length).fill(false));
            });
    }, []);

    const checkedItemCount = checkedItems.filter(item => item).length;

    return (
        <div className='container mx-auto'>
            <div className='flex justify-between text-lg'>
                <h1>{checkedItemCount === 0 ? 'Gallery' : `Checked items: ${checkedItemCount}`}</h1>
                {checkedItemCount > 0 && <button onClick={handleDeleteSelected}>Delete Items</button>}
            </div>
            <div className='imageCal'>
                {data.map((item, index) => (
                    <div key={index} className={`individual ${index === 0 ? 'large' : ''}`}>
                        <img className='imageSize' src={item.image} alt="" />
                        <div className={checkedItems[index] ? 'checked' : 'layout'}>
                            <input
                                type="checkbox"
                                checked={checkedItems[index] || false}
                                onChange={() => handleCheckboxChange(index)}
                                className='checkbox checkboxdesign rounded-sm text-cyan-400 checkbox-error'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
