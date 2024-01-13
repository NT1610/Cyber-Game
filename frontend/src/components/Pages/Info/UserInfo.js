// <<<<<<< HEAD

// import { useEffect, useState } from 'react';
// import {fetchUserInfo} from '../../services/UserService';
// import { Row } from 'react-bootstrap';
// import '../../../scss/Table.scss'
// import { jwtDecode } from 'jwt-decode';
// import ModalChangePass from './ModalChangePass';
// import style from './style.css'

// const UserInfo =() =>{
//     const [userInfo, setUserInfo] = useState([]);
//     const [timeLeft, setTimeLeft] = useState(3665); // Thời gian đếm ngược ban đầu là 3665 giây (1 giờ, 1 phút và 5 giây)
//     const decoded= jwtDecode(localStorage.access_token);

//     useEffect(()=>{
//       getUsers();
//       const timer = setTimeout(() => {
//         if (timeLeft > 0) {
//           setTimeLeft(timeLeft - 1);
//         }
//       }, 1000);
//       return () => clearTimeout(timer);

//     },[timeLeft])

//     const hours = Math.floor(timeLeft / 3600);
//     const minutes = Math.floor((timeLeft % 3600) / 60);
//     const seconds = timeLeft % 60;
  

//     const getUsers= async()=>{
//       let res = await fetchUserInfo(decoded.account);
//       if(res){
//         setUserInfo(res)
//       }
//     }
//     // const itemsPerPage=6
//     // const endOffset = itemOffset + itemsPerPage;
//     // const currentUser = totalUsers.slice(itemOffset, endOffset);
//     // const pageCount = Math.ceil(totalUsers.length / itemsPerPage);
 
//     return (
//         <div  className="user-info">
//           <Row className="justify-content-center">
//           {userInfo ? (
//             <div>
//                 <div></div>
//                 <h2>User Info</h2>
//                 <fieldset>
//                 <legend>Personal:</legend>
//                 <div className="info-row">

//                   <label>Name: </label>
//                   <label className='in'>{userInfo.name}</label>

//                   {/* <span className="info">25</span> */}

//                 </div>
//                 <div className="info-row">
//                 <label>Birth: </label>
//                 <label className='in'> {userInfo.birth}</label>

//                 {/* <span className="info">25</span> */}


//                 </div>
//                 <div className="info-row">
//                 <label>ID: </label>
//                 <label className='in'>{userInfo.id}</label>

//                 {/* <span className="info">25</span> */}


//                   </div>
//                   <div className="info-row">
//                   <label>Phone: </label>
//                   <label className='in'>{userInfo.phone}</label>



//                   </div >
//                   <div className="info-row">
//                   <label>Money: </label>
//                   <label className='in'>{userInfo.money}</label>



//                   </div >
                  
//                 {/* <span className="info">25</span> */}

//                 </fieldset>
//                 <label>Time start: {localStorage.timeStart}</label>

//             </div>
//           ) : (
//             <p>Loading user info...</p>
//           )}
//           </Row>
          
//           <div>
            
//             <h1>Thời gian còn lại: {hours} giờ {minutes} phút {seconds} giây</h1>
//           </div>
//           <ModalChangePass
//           userID={userInfo.userID}
//           />
//         </div>
//     );
// }



// export default UserInfo
// =======

import { useEffect, useState } from 'react';
import {fetchUserInfo} from '../../services/UserService';
import { Row } from 'react-bootstrap';
import '../../../scss/Table.scss'
import { jwtDecode } from 'jwt-decode';
import ModalChangePass from './ModalChangePass';
import style from '../../../scss/UserInfo.css'

const UserInfo =() =>{
    const [userInfo, setUserInfo] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3665); // Thời gian đếm ngược ban đầu là 3665 giây (1 giờ, 1 phút và 5 giây)
    const decoded= jwtDecode(localStorage.access_token);

    useEffect(()=>{
      getUsers();
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);

    },[timeLeft])

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
  

    const getUsers= async()=>{
      let res = await fetchUserInfo(decoded.account);
      if(res){
        setUserInfo(res)
      }
    }
    // const itemsPerPage=6
    // const endOffset = itemOffset + itemsPerPage;
    // const currentUser = totalUsers.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(totalUsers.length / itemsPerPage);
 
    return (
        <div  className="user-info">
          <Row className="justify-content-center">
          {userInfo ? (
            <div>
                <div></div>
                <h2>User Info</h2>
                <fieldset>
                <legend>Personal:</legend>
                <div className="info-row">

                  <label>Name: </label>
                  <label className='in'>{userInfo.name}</label>

                  {/* <span className="info">25</span> */}

                </div>
                <div className="info-row">
                <label>Birth: </label>
                <label className='in'> {userInfo.birth}</label>

                {/* <span className="info">25</span> */}


                </div>
                <div className="info-row">
                <label>ID: </label>
                <label className='in'>{userInfo.id}</label>

                {/* <span className="info">25</span> */}


                  </div>
                  <div className="info-row">
                  <label>Phone: </label>
                  <label className='in'>{userInfo.phone}</label>



                  </div >
                  <div className="info-row">
                  <label>Money: </label>
                  <label className='in'>{userInfo.money}</label>



                  </div >
                  
                {/* <span className="info">25</span> */}

                </fieldset>
                <label>Time start: {localStorage.timeStart}</label>

            </div>
          ) : (
            <p>Loading user info...</p>
          )}
          </Row>
          
          <div>
            
            <h1>Thời gian còn lại: {hours} giờ {minutes} phút {seconds} giây</h1>
          </div>
          <ModalChangePass
          userID={userInfo.userID}
          />
        </div>
    );
}



export default UserInfo
// >>>>>>> 9ce2bc7659e49e2a5f084701aa72a2fb8993233e
