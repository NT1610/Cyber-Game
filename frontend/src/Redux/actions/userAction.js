import { toast } from 'react-toastify';
import { loginApi } from '../../components/services/AdminService';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment'; // hoặc import { format } from 'date-fns';
import { fetchEmployee,fetchAllEmployee,fetchWork ,putUpdateWork} from '../../components/services/AdminService';

export const FETCH_USER_LOGIN='FETCH_USER_LOGIN';
export const FETCH_USER_LOGIN_ERROR='FETCH_USER_LOGIN_ERROR';
export const FETCH_USER_LOGIN_SUCESS='FETCH_USER_LOGIN_SUCESS';
export const USER_REFRESH='USER_REFRESH';


export const USER_LOGOUT='USER_LOGOUT';


export const handleLoginRedux = (userName,password) =>{
    let employeeID

    const currentTime=new Date();
    let formattedDateTime = moment(currentTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const getEmployee = async (decoded) =>{
        let emp = await fetchEmployee(decoded.account)
        let emps = await fetchAllEmployee()
         
        console.log('check', emps)
        for (let i = 0; i < emps.length; i++) {
          if(emps[i].accountID==decoded.account){
            employeeID=i+1
          }
        }
        let status = "ON"
        let startTime = formattedDateTime
        let endTime = formattedDateTime
        console.log('check input ',employeeID,status, startTime, endTime)

        let put =await putUpdateWork(employeeID,status, startTime, endTime)
        console.log('check put ',put)
      }  
    return async(dispatch,getState) => {
        dispatch({type:FETCH_USER_LOGIN});

        let user = JSON.stringify(
            `grant_type=&username=${userName}&password=${password }&scope=&client_id=&client_secret=`
        )
        let res = await loginApi(user);
        console.log("check access_token: ",res);

        if (res && res.access_token){
            toast.success("Log in");
            localStorage.setItem('access_token',res.access_token)
            // localStorage.setItem('userName',userName.trim())
            const decoded= jwtDecode(localStorage.access_token);
            if(decoded.role==='Employee'){
                getEmployee(decoded)
            }
            dispatch({
                type:FETCH_USER_LOGIN_SUCESS,
                data: {userName:userName,access_token:res.access_token}
            })
            // let decoded= jwtDecode(localStorage.access_token)
            // if(decoded.role==="User"){
            //     localStorage.setItem('chose',false)
            // }
        }
        else{
            toast.error("Please check username/password");

            if(res && res.status ===400){
                toast.error(res.data.error);
            }
            if(res && res.status ===422){
                toast.error(res.data.error);
            }
            dispatch({
                type:FETCH_USER_LOGIN_ERROR
            })
        }
    }
}
export const handleLogoutRedux = (userName,password) =>{
    return async(dispatch,getState) => {
        toast.success("Log out");
        dispatch({type:USER_LOGOUT});

        localStorage.clear()

    }
}


export const handleRefresh = (userName,password) =>{
    return async(dispatch,getState) => {
        dispatch({type:USER_REFRESH});
    }
}