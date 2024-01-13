import { useState } from "react";
const LightCard = (props) => {
    const {src,alt} =props
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
      setIsHovered(true);
    };
  
    const handleMouseOut = () => {
      setIsHovered(false);
    };
  return (
    <div className={isHovered ? "component1 brighten" : "component1"}>
        <img 
        src={src}
        // class="image"  
        className={isHovered ? "image brighten" : "image"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        alt={alt}
        />
        <div class={isHovered ? "text brighten" : "text" } style={{ color: "yellow" }}>{alt}</div>
    </div>
  );
};
export default LightCard