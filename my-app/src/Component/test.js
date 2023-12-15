import React,{useState} from 'react';
import '../css/test.css';

const Component1 = () => {
    const [isHovered, setIsHovered] = useState(false);

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
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        <div class="text">BÁNH BAO</div>
    </div>
  );
};

const Component2 = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };
    return(
    <div className="component2">
        <img 
        src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/439/highlight/xSYGh9LQxkm6Ts_6O-BrzA.jpg"
        // class="image"  
        className={isHovered ? "image brighten" : "image"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        
        <div class="text">BÁNH BAO</div>
    </div>
  );
};

const Component3 = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };
    return(
    <div className="component2">
        <img 
        src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/439/highlight/xSYGh9LQxkm6Ts_6O-BrzA.jpg"
        // class="image"  
        className={isHovered ? "image brighten" : "image"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        
        <div class="text">BÁNH BAO</div>
    </div>
  );
};
  const Component4 = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };
    return(
    <div className="component2">
        <img 
        src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/439/highlight/xSYGh9LQxkm6Ts_6O-BrzA.jpg"
        // class="image"  
        className={isHovered ? "image brighten" : "image"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        
        <div class="text">BÁNH BAO</div>
    </div>
  );
};
const Component5 = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };
    return(
    <div className="component2">
        <img 
        src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/439/highlight/xSYGh9LQxkm6Ts_6O-BrzA.jpg"
        // class="image"  
        className={isHovered ? "image brighten" : "image"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        
        <div class="text">BÁNH BAO</div>
    </div>
  );
};
  const Component6 = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };
    return(
    <div className="component2">
        <img 
        src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/439/highlight/xSYGh9LQxkm6Ts_6O-BrzA.jpg"
        // class="image"  
        className={isHovered ? "image brighten" : "image"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}/>
        
        <div class="text">BÁNH BAO</div>
    </div>
  );
};
const Test = () => {
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

export default Test;