import React, { useState } from 'react';
import "../css/button.css";
import "../css/all.css";

const PopupList = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button onClick={togglePopup}>Show List</button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup-overlay" onClick={togglePopup}></div>
          <div className="popup-content">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Info = () => {

  const [isLight, setIsLight] = useState(false);

  const handleMouseOver = () => {
    setIsLight(true);
  };

  const handleMouseOut = () => {
    setIsLight(false);
  };
  const [isBlack, setIsBlack] = useState(false);

  const changeBackgroundColor = () => {
    setIsBlack(!isBlack);
    document.body.style.backgroundColor = isBlack ? 'white' : 'black';
  };

  return (
    <div className="fixed"
    style={{
      position: 'fixed',
      width: `100%`,
      height: `10%`,
      border: '1px solid black',
      backgroundcolor :'pink',
      transition: 'background-color 0.3s',
      backgroundColor: isBlack ? 'black' : 'white',

    }}
   >
     <button onClick={changeBackgroundColor}
    className={`login-button ${isLight ? 'light' : ''}`}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    style={{
      position: 'flex',
      top: '0px',
      right: '0px',}}
    >Change Background Color
     </button> 

       <button
      className={`login-button ${isLight ? 'light' : ''}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        position: 'fixed',
        top: '0px',
        right: '0px',
      }}
    >
      Login
    </button>
    <PopupList/>

    </div>
  );
};

export {Info};
