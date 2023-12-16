import React from 'react';
import '../css/Info.css';

const Image = () => {

  return (
    <div className="imageInfo">

    </div>
  );
};

const Info = () => {

    return(
    <div className="info">
        <p>ẢNH BÃI BIỂN</p>
        
        <p id='un'>TRÔNG RẤT ĐẸP</p>
        <p id='sc'>Trang bị 100% màn hình 240Hz đến từ những thương hiệu hàng đầu như Samsung, Predator, Asus và là đơn vị tiên phong trong việc sử dụng màn hình Zowie XL2566K 360Hz.
        </p>

    </div>
  );
};


const ImageInfo = () => {
  return (
    <div className="container">
      <Image />
      <Info />

    </div>
  );
};

export default ImageInfo;