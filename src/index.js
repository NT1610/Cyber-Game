import React from 'react';
import ReactDOM from 'react-dom/client';
import {Bar} from './Component/MainInterface/NevigationBar/Fixed_info';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {Point} from './Component/Point';
import Menu from './Component/MainInterface/MenuOrder/Menu';
// import MultipleItemsSlider from './Component/test2';
import ImageInfo from './Component/MainInterface/Info/Info';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Bar/>
    <App />
    {/* <Point /> */}
    {/* <Point/> */}
    <Menu/>
    {/* <MultipleItemsSlider/> */}
    <ImageInfo></ImageInfo>    
  </React.StrictMode>
);

// // Tạo một div element cho component cố định
// var fixedComponent = document.createElement("div");
// fixedComponent.textContent = "Nội dung của component cố định";

// // Thêm CSS cho component cố định
// fixedComponent.style.position = "fixed";
// fixedComponent.style.top = "50px"; // Vị trí từ đỉnh trang
// fixedComponent.style.right = "20px"; // Vị trí từ phải trang
// fixedComponent.style.padding = "10px";
// fixedComponent.style.background = "lightgray";
// fixedComponent.style.border = "1px solid black";

// // Thêm component cố định vào body của trang
// document.body.appendChild(fixedComponent);

// // Xử lý sự kiện cuộn chuột
// window.addEventListener("scroll", function() {
//   // Kiểm tra vị trí cuộn chuột
//   if (window.scrollY > 100) {
//     fixedComponent.style.display = "block"; // Hiển thị component khi cuộn xuống
//   } else {
//     fixedComponent.style.display = "none"; // Ẩn component khi cuộn lên đầu trang
//   }
// });


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
