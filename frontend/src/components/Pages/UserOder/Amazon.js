import React from 'react';
import list from '../data';
import "../../../scss/amazon.scss"
import Cards from './Cards';
import { useState, useEffect } from 'react';

const Amazon = ({handleClick}) => {
  // const [computers, setComputers] = useState([]);
  // useEffect(()=>{
  //     getComputer();
  //   },[])
  // const getComputer= async()=>{
  //     let res = await fetchAllComputer(1);
  //     if(res){
  //       setComputers(res.sort((a, b) => a.comID - b.comID))
  //     }
  //   }
  //   const handleUpdateTable = (computer) =>{
  //     setComputers([computer, ...computers])
  //   }
  return (
    <div>
    <div className="container1">ĐỒ ĂN</div>
    <section>
    {
      list.map((item) => {
        if (item.id <= 6) {
          return <Cards item={item} key={item.id} handleClick={handleClick} />;
        } else {
          return null; // Hoặc thay bằng JSX tương ứng nếu cần
        }
      })
    }
    </section>
    <div className="container1">ĐỒ UỐNG</div>
    <section>
    {
      list.map((item) => {
        if (item.id > 6) {
          return <Cards item={item} key={item.id} handleClick={handleClick} />;
        } else {
          return null; // Hoặc thay bằng JSX tương ứng nếu cần
        }
      })
    }
    </section>
    </div>
  )
}

export default Amazon