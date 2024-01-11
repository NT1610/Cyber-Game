import { toast } from 'react-toastify';
import React,{useState} from 'react';
import { useEffect } from 'react';
import "../../../scss/cart.css"
import dongXu from "../menuImage/dongXu.jpg"
import banhBao from "../menuImage/banhBao.png"
import sandwich from "../menuImage/sandwich.jpg"
import bunBo from "../menuImage/bunBo.jpg"
import bunBoNam from "../menuImage/bunBoNamBo.jpg" 
import comChien from "../menuImage/comChien.jpg" 
import oLong from "../menuImage/OLongVai.jpg" 
import pepSI from "../menuImage/Pepsi.jpg" 
import SuaDuaKhoaiTim from "../menuImage/SuaDuaKhoaiTim.jpg" 
import Matcha from "../menuImage/Matcha.jpg" 
import HongCha from "../menuImage/Hongtra.jpg" 
import Coca  from "../menuImage/Coca.jpg" 
import { fetchUserInfo } from '../../services/UserService';
import { postCreateOrder,postCreateReciept } from '../../services/UserService';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from '../../../Redux/actions/userAction';
import moment from 'moment'; // hoặc import { format } from 'date-fns';


const listImage=[banhBao,sandwich,bunBo,bunBoNam,dongXu,comChien,oLong,SuaDuaKhoaiTim,pepSI,Matcha,HongCha,Coca,dongXu,dongXu];


const Cart = ({cart, setCart, handleChange,account,setAccount}) => {
    const [price, setPrice] = useState(0);
    const [userID, setUserID] = useState('0');
    const [currentTime, setCurrentTime] = useState(new Date());
    const formattedDateTime = moment(currentTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');


    const decoded= jwtDecode(localStorage.access_token);

    const getUserInfo = async() =>{
        let user = await fetchUserInfo(decoded.account);
        setUserID(user.userID)
    }
    const handlePrice = ()=>{
        let ans = 0;
        cart.map((item)=>(
            ans += item.amount * item.price
        ))
        setPrice(ans);
    }

    const handleRemove = (id) =>{
        const arr = cart.filter((item)=>item.id !== id);
        for (let i = 0; i < cart.length; i++) {
            if(cart[i].id === id){
                cart[i].amount=1
            }
          } 
        setCart(arr);
        // handlePrice();
    }
    const handleRemoveAll = () =>{
        for (let i = 0; i < cart.length; i++) {
            cart[i].amount=1
          } 
        const arr =[];
        setCart(arr);
        setPrice(0)
        // handlePrice();
    }
    


    const payAll = async() =>{
        var balance;
        balance = account + price;

        
        console.log(typeof(userID))
        console.log(typeof(localStorage.userID))
        console.log((userID))
        console.log((localStorage.userID))

        
        let Status="Ordered";
        for (let i = 0; i < cart.length; i++) {
            let res=await postCreateOrder(userID,cart[i].id,cart[i].amount,formattedDateTime,Status)
            if(res&& res.orderID){
                toast.success(`Ordered sucess ${cart[i].amount} x ${cart[i].title} ${cart[i].author}`)
            }
            else{
                alert('Error while order');
            }
        }
        const description='food&drink bill'
        let res=await postCreateReciept(userID,description,price,formattedDateTime,Status)
        if(res && res.receiptID){
            toast.success(`Reciept created`)
        }
        else{
            alert('Error while order');
        }
        setAccount(balance);
        handleRemoveAll();
    
    }
    useEffect(()=>{
        handlePrice();
        getUserInfo();
        const interval = setInterval(() => {
            setCurrentTime(new Date());
          }, 1000);
          return () => clearInterval(interval);
    },[])

  return (
    <article>
              <p>Thời gian hiện tại: {currentTime.toLocaleTimeString()}</p>
      <p>Thời gian hiện tại: {formattedDateTime}</p>
        {
            cart?.map((item)=>(
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={listImage[item.id-1]} />
                        <p>{item.title}</p>
                    </div>
                    <div>
                        <button onClick={()=>handleChange(item, -1)}> - </button>
                        <button>{item.amount}</button>
                        <button onClick={()=>handleChange(item, +1)}> + </button>
                    </div>
                    <div>
                        <span>{item.price} VNĐ</span>
                        <button onClick={()=>handleRemove(item.id)} >Remove</button>
                    </div>
                </div>
            ))}
        <div className='container'>
            <button id='check' onClick={()=>handleRemoveAll()} >Clear</button>
        </div>
        {/* <div className='total'>
            <span>SỐ DƯ HIỆN CÓ:</span>
            <span>{account} VNĐ</span>
        </div> */}
        <div className='total'>
            <span>TỔNG HOÁ ĐƠN:</span>
            <span>{price} VNĐ</span>
        </div>
        <div className='container'>
            <button id='check' onClick={()=>payAll()} >THANH TOÁN</button>
        </div>
        <div className='total' id='now'>
            <span>TỔNG CẦN THANH TOÁN:</span>
            <span>{price} VNĐ</span>
        </div>
    </article>
  )
}

export default Cart