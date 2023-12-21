import React, { useState } from 'react';
let currentPosition={x:0,y:0}
const Point = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const boxWidth = 400; // Adjust the width of the box
  const boxHeight = 300; // Adjust the height of the box

  const handleClick = (event) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (event) => {
    const newX = event.clientX;
    const newY = event.clientY-400;
    setPosition({ x: newX, y: newY });
    currentPosition = { newX, newY };
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  // const handleContextMenu = (event) => {
  //   event.preventDefault();
  //   setPosition({ x: 0, y: 0 });
  // };

  return (
    <div
    style={{
      position: 'relative',
      width: `${boxWidth}px`,
      height: `${boxHeight}px`,
      border: '1px solid black',
      flex: "1",
    }}
   > 
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        cursor: 'pointer',
      }}
      onDoubleClick={handleClick}
      onClick={handleMouseUp}
    ></div>
    </div>
  );
};

export {Point,currentPosition};
