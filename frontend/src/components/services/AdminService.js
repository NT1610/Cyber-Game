import axios from "./CustomizeAxios";
//get method

const token =localStorage.access_token
const fetchAllAccount =()=>{
    return axios.get("/admin/account", 
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const fetchAllUser =()=>{
    return axios.get("/admin/userinfo/",
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const fetchUserInfo = (id) =>{
    return axios.get(`/admin/userinfo/${id}`,
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const fetchAllComputer =()=>{
    return axios.get("/admin/computer",
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const fetchAllOrder =()=>{
    return axios.get("/admin/order",
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const fetchAllEmployee=() =>{
    return axios.get('/admin/employee',
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const fetchComputer =(com_id)=>{
    return axios.get(`/user/connect/${com_id}`,
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}

//post method
const postCreateUser  =(accountID,name,birth,id,phone,money)=>{
    return axios.post("/admin/userinfo",{accountID,name,birth,id,phone,money},
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const postCreateAccount =(account,password,role)=>{
    return axios.post("/admin/account",{account,password,role},
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const postCreateComputer =(area,status)=>{
    return axios.post("/admin/computer",{area,status},
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}

//put method

const putUpdateAccount =(id,account,password,role) =>{
    return axios.put(`/admin/account/${id}`,{account,password,role},
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}

const putUpdateUser =(userID,accountID,name,birth,id,phone,money) =>{
    return axios.put(`/admin/userinfo/${userID}`,{userID,accountID,name,birth,id,phone,money},
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const putUpdateComputer =(connect,computer,comID) =>{
    return axios.put(`/admin/computer?comID=${comID}`,{connect,computer},
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
//delete method

const deleteAccount = (id) =>{
    return axios.delete(`/admin/account/${id}`,
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const deleteUser= (id) =>{
    return axios.delete(`/admin/userinfo/${id}`,
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
const deleteComputer= (id) =>{
    return axios.delete(`/admin/computer/?comID=${id}`,
    {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
    )
}
//auth
const loginApi =(request) => {
    return axios.post("/login",request)
}



export {fetchAllAccount,postCreateAccount,putUpdateAccount,deleteAccount,loginApi,fetchUserInfo,fetchAllComputer,fetchAllUser,postCreateUser,deleteUser,putUpdateUser,postCreateComputer,putUpdateComputer,deleteComputer,fetchAllEmployee,fetchAllOrder,fetchComputer};