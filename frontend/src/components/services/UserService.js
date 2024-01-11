import axios from "./CustomizeAxios";
//get method

const token =localStorage.access_token

const fetchUserInfo = (id) =>{
    return axios.get(`/user/userinfo/account/${id}`,
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const fetchAllComputer =()=>{
  return axios.get("/user/computer",
  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }
  )
}
const fetchConnect =(user_id)=>{
  return axios.get(`/user/connect/user/${user_id}`,
  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }
  )
}
//post method

const postCreateOrder =(userID,foodID,quantity,orderTime,status)=>{
    return axios.post("/user/order",{userID,foodID,quantity,orderTime,status},
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}

const postCreateReciept =(userID,description,money,time)=>{
  return axios.post("/user/reciept",{userID,description,money,time},
  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }
  )
}


//put method
const putUpdateComputer =(connect,computer,comID) =>{
  return axios.put(`/user/computer?comID=${comID}`,{connect,computer},
  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }
  )
}
const putUpdatePass =(account_id,account,password,role) =>{
  return axios.put(`/employee/account/${account_id}`,{account,password,role},
  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }
  )
}



export {fetchUserInfo,postCreateOrder,postCreateReciept,fetchAllComputer,putUpdateComputer,fetchConnect,putUpdatePass};