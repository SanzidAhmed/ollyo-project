import React, { useEffect, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

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
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setCheckedItems(Array(data.length).fill(false));
      });
  }, []);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (index !== draggedIndex) {
      const newData = [...data];
      const [draggedItem] = newData.splice(draggedIndex, 1);
      newData.splice(index, 0, draggedItem);
      setData(newData);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="container mx-auto divide-y">
      <div className="flex justify-between text-lg my-4">
        <h1>{checkedItems.every((item) => !item) ? 'Gallery' : `Checked items: ${checkedItems.filter(Boolean).length}`}</h1>
        {checkedItems.some((item) => item) && <button onClick={handleDeleteSelected}>Delete Items</button>}
      </div>
      <div className="imageCal py-10">
        {data.map((item, index) => (
          <div
            key={index}
            className={`individual ${index === 0 ? 'large' : ''} ${index === draggedIndex ? 'dragged' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            onDragEnd={handleDragEnd}
          >
            <img className="imageSize" src={item.image} alt="" />
            <div className={checkedItems[index] ? 'checked' : 'layout'}>
              <input
                type="checkbox"
                checked={checkedItems[index] || false}
                onChange={() => handleCheckboxChange(index)}
                className="checkbox checkboxdesign rounded-sm text-cyan-400 checkbox-error"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
