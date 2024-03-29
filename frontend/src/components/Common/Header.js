import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useContext } from 'react';
// import { UserContext } from '../../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux, handleLogoutRedux } from '../../Redux/actions/userAction';
import { useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode";
import moment from 'moment';
import { putUpdateWork, fetchEmployee,fetchAllEmployee,fetchWork } from '../services/AdminService';




const Header=({size, setShow})=>{
  const currentTime=new Date();
  let formattedDateTime = moment(currentTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  let [LoginTIme,setLoginTIme]=useState('');
  let [LogoutTime,setLogoutTime]=useState();

  const dispatch = useDispatch();
  const user =useSelector(state => state.user.account)
  let employeeID=0

  let decoded = '';
  if (localStorage.access_token){
     decoded= jwtDecode(localStorage.access_token);
  }
  // console.log('check decoded: ',decoded.role); 
  // const {logout ,user} = useContext(UserContext);
  const navigate =useNavigate();
    const handleLogout = () =>{
      if(decoded && decoded.role=='Employee'){
        getEmployee()
      }
      dispatch(handleLogoutRedux());
      // logout()
      navigate("/");
      // toast.success("Logouted");
    }
    useEffect(() =>{
      if ( user && user.access_token ===false){
          navigate('/')
      }
    }, [user])
    if(user && user.auth===true){

    }

    const getEmployee = async () =>{
      let emp = await fetchEmployee(decoded.account)
      let emps = await fetchAllEmployee()
       
      for (let i = 0; i < emps.length; i++) {
        if(emps[i].accountID==decoded.account){
          employeeID=i+1
        }
      }
      let res = await fetchWork(employeeID)
      console.log('check ON',res)
      let status = "OFF"
      let startTime = res.startTime
      let endTime = formattedDateTime
      let put =await putUpdateWork(employeeID,status, startTime, endTime)
      console.log('check put ',put)
    }

    return(
    <Navbar expand="lg" 
    className="bg-body-tertiary" 
    bg='dark'
    data-bs-theme={window.location.pathname === '/login' ? 'dark' :''}> 
    <Container >

      <NavLink to="/" className='navbar-brand'>
              <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              />
          CYBER GAME
      </NavLink>
      { (user && user.auth || window.location.pathname ==='/') &&
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
              <NavLink className='nav-link' to="/">
                  Home
              </NavLink>
              {/* admin */}
              {decoded.role==='Admin' &&
                <NavLink className='nav-link' to="/manageAccount">
                  Manage Account
                </NavLink>
              }
              {(decoded.role==='Admin') &&
                <NavLink className='nav-link' to="/manageEmployee">
                  Manage Employee
                </NavLink>
              }
              {(decoded.role==='Admin') &&
                <NavLink className='nav-link' to="/manageUser">
                  Manage User
                </NavLink>
              }
              {(decoded.role==='Admin') &&
                <NavLink className='nav-link' to="/computer">
                  Computer
                </NavLink>
              }
              {(decoded.role==='Admin') &&
                <NavLink className='nav-link' to="/reciept">
                  Reciept List
                </NavLink>
              }
              {(decoded.role==='Admin' || decoded.role==='Employee') &&
                <NavLink className='nav-link' to="/OrderedList">
                  Order List
                </NavLink>
              }

              {/* employee */}
              {decoded.role==='Employee' &&
                <NavLink className='nav-link' to="/manageUser">
                  Manage User
                </NavLink>
              }
              {decoded.role==='Employee' &&
                <NavLink className='nav-link' to="/computer">
                  Computer
                </NavLink>
              }

              {/* user */}
              {decoded.role==='User' && localStorage.chose ==='true' &&
                <NavLink className='nav-link' to="/user">
                  ORDER Đồ Ăn
                </NavLink>
              }
              {decoded.role==='User' &&
                <NavLink className='nav-link' to="/chooseCOMP">
                  Chọn máy
                </NavLink>
              }

          </Nav>

            {user && user.userName &&
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  WELCOME:<b>{user.userName}</b> 
                </Navbar.Text>

              </Navbar.Collapse>
            } 
            

            <Nav>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {user && user.auth===true
                  && <NavLink className=' dropdown-item' to="/info">Info</NavLink>
                }
                {user && user.auth===true
                  ? <NavDropdown.Item onClick={handleLogout}> Logout </NavDropdown.Item>
                  : <NavLink className=' dropdown-item' to="/login"> Log In</NavLink>
                }
                {/* <NavDropdown.Item onClick={handleLogout}> Logout </NavDropdown.Item>
                <NavLink className=' dropdown-item' to="/login"> Log In</NavLink> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </>
      }
    </Container>
  </Navbar>)
}
export default Header;