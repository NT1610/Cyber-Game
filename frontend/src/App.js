import './App.scss';
import Header from './components/Common/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from './Redux/actions/userAction';
// import Footer from './components/Common/Footer';
// import style from "./app.css"

function App() {
  const dispatch =useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("access_token")){
      // loginContext(localStorage.getItem("email"),localStorage.getItem("token"))
      dispatch(handleRefresh())
    }
  },[])
  const blockStyle = {
    width: '100%', /* Kích thước của thẻ chứa ảnh */
    height: '50px',

  };
  return (
    <div className='app-container'>
      
      <Header/>
      <div style={blockStyle}/>
        <AppRoutes></AppRoutes>
      <ToastContainer
      position="top-right"
      autoClose={1000}
      />
      {/* <Footer/> */}
    </div>
  );
}

export default App;
