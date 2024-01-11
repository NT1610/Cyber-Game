
import '../../../scss/Table.scss';
import {jwtDecode} from "jwt-decode";
import { useEffect,useState } from 'react';
import { fetchUserInfo } from '../../services/UserService';
import { fetchConnect } from '../../services/UserService';
import { handleRefresh } from '../../../Redux/actions/userAction';
import { useDispatch } from 'react-redux';
import moment from 'moment'; // hoặc import { format } from 'date-fns';
import poster from '../../../assets/MainHome.gif';
import style from './Home.css'



const Time = () =>{
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formattedDateTime = moment(currentTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return (

    <div>

      <p>Thời gian hiện tại: {currentTime.toLocaleTimeString()}</p>
      <p>Thời gian hiện tại: {formattedDateTime}</p>

      
    </div>
  );
}
const Home =() =>{
  const [pickedComp, setPickedComp] = useState("");
  const dispatch =useDispatch();

  useEffect(()=>{
    getUsers();

  },[])

  const getUsers= async()=>{
    if(localStorage.access_token){
      const decoded= jwtDecode(localStorage.access_token);
      console.log(decoded)
      if(decoded.role==="User"){
        let user = await fetchUserInfo(decoded.account);
        console.log('check user>>',decoded)
        getCompInfo(user.userID)
        console.log('check user>>',user)
      }
    }
  }
  const getCompInfo = async(userID) =>{
    let comp = await fetchConnect(userID);
    console.log('checkcomp',comp,userID)
    if(comp.comID){
      setPickedComp(comp.comID)
      localStorage.setItem('chose',true)
      dispatch(handleRefresh())
    }
    else{
      localStorage.setItem('chose',false)
    }
    console.log('check picked comp',pickedComp)
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
    <body>
      <>Hello this is home page</>
      <Time></Time>
      <div>
        <img className='poster' src = {poster} alt ='Main'></img>
      </div>
      <div>
        <button onClick={handleClick}>Bấm vào đây đã chọn máy</button>
      </div>
    </body>
  )

}
export default Home
