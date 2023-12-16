import React, { useState } from 'react';
import "./button.css";
import "./all.css";

const PopupList = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button className='login-button' onClick={togglePopup}>
      <i class="fa fa-bars"></i>
      </button>
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

const Bar = () => {

  const [isLight, setIsLight] = useState(false);
  const [isBlack, setIsBlack] = useState(false);


  const handleMouseOver = () => {
    setIsLight(true);
  };

  const handleMouseOut = () => {
    setIsLight(false);
  };

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

     <button id='sun' onClick={changeBackgroundColor}
    className='login-button'
    style={{
      position: 'flex',
      top: '0px',
      right: '0px',
      backgroundColor: isBlack ?  '#323286' : 'rgb(225, 196, 66)' 
    }}
    >

    <i class="fa fa-sharp fa-light fa-sun fa-xl" style={{color:'#323286', }}></i>
    <i class="fa fa-sharp fa-light fa-moon fa-xl" style={{color: isBlack ? 'rgb(225, 196, 66)' : 'transparent'}}></i>

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

export {Bar};
