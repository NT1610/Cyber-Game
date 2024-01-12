import { useContext, useEffect, useState } from 'react';
import '../../../scss/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { handleLoginRedux } from '../../../Redux/actions/userAction';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Login = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading=useSelector(state =>state.user.isLoading)
    const account=useSelector(state =>state.user.account)


    // const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');



    const handleLogin =async()  =>{
        

        dispatch(handleLoginRedux(userName,password));
 
        // if (res && res.token){
        //     navigate("/");
        //     toast.success("login");
        //     loginContext(userName,res.token)

        // }
        // else{
        //     if(res && res.status ===400){
        //         toast.error(res.data.error);
        //     }
        // }
    }
    const handleEnter = (e) =>{
        if(e && e.key === "Enter"){
            handleLogin()
        }
    }
    const handleGoBack =async() =>{
        await(navigate("/"));
    }

    useEffect(() =>{
        if ( account && account.auth ===true){
            navigate('/')
        }
    }, [account])
    // const togglePasswordVisibility = () => {
    //   setShowPassword(!showPassword);
    //   setShowIcon(!showIcon);
    // };  
    return (
        <div className ='login-container col-12 col-sm-4 '>
                        {/* <div className="text">Email or Username</div> */}

            <span className='title'>LOGIN</span>
            <input 
                placeholder="username/email" 
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value.trim())}
                onKeyDown={(e) => handleEnter(e)}
            />

                <input
                    placeholder="password" 
                    className="form-control"
                    // type={showPassword ? 'text' : 'password'}
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    onKeyDown={(e) => handleEnter(e)}
                />
                
            <button 
                className={userName && password ? 'active' :''}
                disabled={userName && password ? false : true}
                onClick={handleLogin} 
            >
                {isLoading && <i className='fa-solid fa-spinner fa-spin-pulse'></i>}
                Login
            </button>
            <span>
                <i className='fa-solid fa-angles-left'/>
                <span onClick={handleGoBack}>    Back</span>
            </span>
        </div>
    )
}
export default Login;

