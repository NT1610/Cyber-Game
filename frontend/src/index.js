import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes,Route,Link } from 'react-router-dom';
// import { UserProvider } from './context/UserContext';
import store from './Redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
    <React.StrictMode>
        <BrowserRouter>
          <App />
          <Routes>
          {/* <Route path='/login' element={<Login />}></Route> */}
          </Routes>
        </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

    {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
    </Routes>
    </BrowserRouter> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
