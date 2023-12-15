import React from 'react';

const OtherComponent = ({ position }) => {
  return (
    <div>
      <p>Current position: x={position.x}, y={position.y}</p>
      {/* Other component content */}
    </div>
  );
};

export default OtherComponent;