
import '../../../scss/Table.scss'
import {jwtDecode} from "jwt-decode";
import { useEffect,useState } from 'react';
import { fetchUserInfo } from '../../services/UserService';

const Time = () =>{
  const [currentTime, setCurrentTime] = useState(new Date());



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (

    <div>

      <p>Thời gian hiện tại: {currentTime.toLocaleTimeString()}</p>
    </div>
  );
}
const Home =() =>{

  useEffect(()=>{
    getUsers();
  },[])

  const getUsers= async()=>{
    // if(localStorage.access_token){
    //   const decoded= jwtDecode(localStorage.access_token);
    //   let res = await fetchUserInfo(decoded.account);
    //   if(res){
    //     localStorage.setItem('userID',res.userID)
    //   }
    //   console.log('>>chec',res)
    // }
  }


  const handleClick = () => {
      const loginedTime= new Date();
      const hours = loginedTime.getHours();
      const minutes = loginedTime.getMinutes();
      const seconds = loginedTime.getSeconds();
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      if(localStorage.chose === "false"){

        localStorage.setItem('chose',true)
        localStorage.setItem('timeStart',formattedTime)
    }
  }

  return(
    <>
      <>Hello this is home page</>
      <Time></Time>
      <div>
        <button onClick={handleClick}>Bấm vào đây đã chọn máy</button>

      </div>
    </>
  )

}
export default Home
