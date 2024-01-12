
//import '../../../scss/Table.scss'
//import '../../../scss/home.scss'
import {jwtDecode} from "jwt-decode";
import { useEffect,useState } from 'react';
import { fetchUserInfo } from '../../services/UserService';
import { fetchConnect } from '../../services/UserService';
import { handleRefresh } from '../../../Redux/actions/userAction';
import { useDispatch } from 'react-redux';
import moment from 'moment'; // hoặc import { format } from 'date-fns';
import poster from '../../../assets/MainHome.gif';
import dongXu from "../menuImage/dongXu.jpg"
import banhBao from "../menuImage/banhBao.png"
import sandwich from "../menuImage/sandwich.jpg"
import bunBo from "../menuImage/bunBo.jpg"
import bunBoNam from "../menuImage/bunBoNamBo.jpg" 
import comChien from "../menuImage/comChien.jpg" 
import oLong from "../menuImage/OLongVai.jpg" 
import pepSI from "../menuImage/Pepsi.jpg"
import style from './Home.css'
import LightCard from "./LightCard";



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
    <div className='home'>
      {/* Hello this is home page
      <Time></Time> */}
      <div>
        <img className='poster' src = {poster} alt ='Main'></img>
      </div>
      <div className="Cyber-text">Táo Gaming</div>
      <div className="inside-cyber">
        <img className="Cyber" src ="https://icafe.hoangtuan.vn/media/news/3001_xu-huong-lap-dat-cyber-game-phong-game-hien-nay.jpg" alt = "pic"></img>
        <img className="Cyber" src ="https://file.hstatic.net/200000536009/article/thiet_ke_chua_co_ten__15__85dd4fe0c8ee45dca39d23ea2f4ff879_1024x1024.png" alt = "pic"></img>
        <img className="Cyber" src ="https://cybercore.vn/wp-content/uploads/2020/09/thiet-ke-thi-cong-phong-cyber-game-hang-dau-tphcm.jpg" alt = "pic"></img>
      </div>
      <div className="cauHinh">
        <div className="Monitor" >
          <img className="picMonitor" src="https://www.vikingscyber.com/assets/images/man-hinh.jpg" alt="Monitor"></img>
          <div className="textMonitor">
            <div className = "Gaming">Táo Gaming</div>
            <div className="title"> MÀN HÌNH 240Hz - 360Hz </div>
            <div className="description">Trang bị 100% màn hình 240Hz đến từ những thương hiệu hàng đầu như Samsung, Predator, Asus và là đơn vị tiên phong trong việc sử dụng màn hình Zowie XL2566K 360Hz.</div>
        </div>
        </div>
        <div className="Gear" >
        <div className="textGear">
            <div className = "Gaming">Táo Gaming</div>
            <div className="title"> HI-END GEAR </div>
            <div className="description">Sử dụng Gaming gear theo tiêu chuẩn eSports, bao gồm: Bàn phím cơ AKKO, Chuột Gaming Endgame Gear đến từ Đức & chuột Zowie EC series.</div>
        </div>
          <img className="picGear" src="https://thumbs.vikingscyber.com/1440x829/vk-assets/media/857/galleries/paXLD7i8nUCo3wIJrqESdw.JPG" alt="Monitor"></img>
        </div>
      </div>
      <div className="Cyber-text">
        Thực đơn đa dạng
      </div >
      <div className = "Menu ">
        {/* <img className="Food" src = {dongXu} alt="Banh dong xu"></img>
        <img className="Food" src = {banhBao} alt = "Banh bao"></img>
        <img className="Food" src = {sandwich} alt = "sandwich"></img>
        <img className="Food" src = {bunBo} alt="Bun Bo"></img>
        <img className="Food" src = {bunBoNam} alt="Bun Bo Nam Bo"></img>
        <img className="Food" src = {comChien} alt="Com Chien"></img>
        <img className="Food" src = {oLong} alt="O long"></img> */}
        <LightCard
        src={dongXu}
        alt={'Banh dong xu'}
        />
        <LightCard
        src={banhBao}
        alt={'Banh bao'}
        />
        <LightCard
        src={sandwich}
        alt={'Sandwitch'}
        />
        <LightCard
        src={bunBo}
        alt={'Bún Bò'}
        />
        <LightCard
        src={comChien}
        alt={'Cơm Chiên'}
        />
                
        {/* <img className="Food" src = {pepSI} alt="Pepsi"></img> */}
      </div>

    </div>

  )

}
export default Home
