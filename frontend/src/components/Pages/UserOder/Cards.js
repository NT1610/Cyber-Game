import React from 'react';
import "../../../scss/cards.scss"
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

const listImage=[banhBao,sandwich,bunBo,bunBoNam,dongXu,comChien,oLong,SuaDuaKhoaiTim,pepSI,Matcha,HongCha,Coca,dongXu,dongXu];

const Cards = ({item, handleClick}) => {
  if (!item) {
    return <div></div>;
  }
  const {title, author, price, id} = item;
  return (
    <div className="cards">
        <div className="image_box">
            <img src={listImage[id-1]} alt="Image" />
        </div>
        <div className="details">
            <p>{title}</p>
            <p>{author}</p>
            <p>{price} VNĐ</p>
            <button onClick={()=>handleClick(item)} >Add to Cart</button>
        </div>
    </div>
  )
}

export default Cards