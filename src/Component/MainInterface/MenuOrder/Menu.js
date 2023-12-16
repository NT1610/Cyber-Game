import React,{useState} from 'react';
import './test.css';

const Component1 = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showCaption, setShowCaption] = useState(false);
    const [showAdditionalCaption, setShowAdditionalCaption] = useState(false);


    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };

  return (
    <div className="component1">
        <img 
        src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/438/highlight/MAEr7uJ3vUafz2OnzGfFIw.jpg"
        // class="image"  
        className={isHovered ? "image brighten" : "image"}
        alt="Description of the image"
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseLeave={() => {
          setShowCaption(false);
          setShowAdditionalCaption(false);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        {showCaption &&<p id='cap'
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>BÁNH BAO</p>        
        }
        {showAdditionalCaption && (
        <p id='cap2'
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>20.000 VNĐ</p>
      )}
    </div>
  );
};


const Component2 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [showAdditionalCaption, setShowAdditionalCaption] = useState(false);


  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

return (
  <div className="component2">
      <img 
      src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/439/highlight/xSYGh9LQxkm6Ts_6O-BrzA.jpg"
      // class="image"  
      className={isHovered ? "image brighten" : "image"}
      alt="Description of the image"
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseLeave={() => {
        setShowCaption(false);
        setShowAdditionalCaption(false);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}/>
      {showCaption &&<p id='cap'
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>BÁNH MÌ SANDWICH VIKINGS</p>        
      }
      {showAdditionalCaption && (
      <p id='cap2'
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>40.000 VNĐ</p>
    )}
  </div>
);
};

const Component3 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [showAdditionalCaption, setShowAdditionalCaption] = useState(false);


  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

return (
  <div className="component3">
      <img 
      src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/465/highlight/LDGPnspwmU-Fld1HbCITkA.jpg"
      className={isHovered ? "image brighten" : "image"}
      alt="Description of the image"
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseLeave={() => {
        setShowCaption(false);
        setShowAdditionalCaption(false);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}/>
      {showCaption &&<p id='cap'
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>BÚN BÒ NAM BỘ</p>        
      }
      {showAdditionalCaption && (
      <p id='cap2'
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>45.000 VNĐ</p>
    )}
  </div>
);
};
  const Component4 = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showCaption, setShowCaption] = useState(false);
    const [showAdditionalCaption, setShowAdditionalCaption] = useState(false);


    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };

  return (
    <div className="component1">
        <img 
        src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/435/highlight/SwoLngMyvU-HjX9Wx5u08g.jpg"
        className={isHovered ? "image brighten" : "image"}
        alt="Description of the image"
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseLeave={() => {
          setShowCaption(false);
          setShowAdditionalCaption(false);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        {showCaption &&<p id='cap'
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>MÌ BÒ MỸ KIỂU THÁI</p>        
        }
        {showAdditionalCaption && (
        <p id='cap2'
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>40.000 VNĐ</p>
      )}
    </div>
  );
};
const Component5 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [showAdditionalCaption, setShowAdditionalCaption] = useState(false);


  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

return (
  <div className="component5">
      <img 
      src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/462/highlight/_oMeFDbDMUeD72w4b9pkhA.jpg"
      className={isHovered ? "image brighten" : "image"}
      alt="Description of the image"
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseLeave={() => {
        setShowCaption(false);
        setShowAdditionalCaption(false);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}/>
      {showCaption &&<p id='cap'
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>SỮA DỪA KHOAI TÍM</p>        
      }
      {showAdditionalCaption && (
      <p id='cap2'
      onMouseEnter={() => {
        setShowCaption(true);
        setShowAdditionalCaption(true);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>35.000 VNĐ</p>
    )}
  </div>
);
};
  const Component6 = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showCaption, setShowCaption] = useState(false);
    const [showAdditionalCaption, setShowAdditionalCaption] = useState(false);


    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };

  return (
    <div className="component1">
        <img 
        src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/464/highlight/qYMH8oXY_EeekbQhXco3EA.jpg"
        // class="image"  
        className={isHovered ? "image brighten" : "image"}
        alt="Description of the image"
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseLeave={() => {
          setShowCaption(false);
          setShowAdditionalCaption(false);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        {showCaption &&<p id='cap'
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>TRÀ Ô LONG VẢI TẮC</p>        
        }
        {showAdditionalCaption && (
        <p id='cap2'
        onMouseEnter={() => {
          setShowCaption(true);
          setShowAdditionalCaption(true);
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>35.000 VNĐ</p>
      )}
    </div>
  );
};
const Menu = () => {
  return (
    <div className="container">
      <Component1 />
      <Component2 />
      <Component3 />
      <Component4 />
      <Component5 />
      <Component6 />
    </div>
  );
};

export default Menu;