
import { useEffect, useState } from 'react';
import {fetchUserInfo} from '../../services/UserService';
import { Row } from 'react-bootstrap';
import '../../../scss/Table.scss'
import { jwtDecode } from 'jwt-decode';

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
        <div>
          <Row className="justify-content-center">
          {userInfo ? (
            <div>
                <div></div>
                <h2>User Info</h2>
                <p>Name: {userInfo.name}</p>
                <p>Birth: {userInfo.birth}</p>
                <p>ID: {userInfo.id}</p>
                <p>Phone: {userInfo.phone}</p>
                <p>Money: {userInfo.money}</p>
                <p>TIme start: {localStorage.timeStart}</p>
            </div>
          ) : (
            <p>Loading user info...</p>
          )}
          </Row>
          <div>
            <h1>Thời gian còn lại: {hours} giờ {minutes} phút {seconds} giây</h1>
          </div>
        </div>
    );
}



export default UserInfo
