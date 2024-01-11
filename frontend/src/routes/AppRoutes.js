import { Routes,Route } from "react-router-dom";
import Home from "../components/Pages/Home/Home";
import Login from "../components/Pages/Login/Login";
import PrivateRoute from "./PrivateRoutes";
import NotFound from "../components/Pages/NotFound";
import TableAcount from "../components/Pages/Manage/Admin/AccountManger/TableAccount";

import PrivateRoutesUser from "./PrivateRoutesUser";
import PrivateRoutesEmployee from "./PrivateRoutesEmployee";
import OrderContainer from "../components/Pages/UserOder/OrderContainer";
import UserInfo from "../components/Pages/Info/UserInfo";
import Computer from "../components/Pages/Manage/ComputerManager/Computer";
import TableUsers from "../components/Pages/Manage/UserManager/TableUser";
import TableEmployee from "../components/Pages/Manage/Admin/EmployeeManager/TableEmployee";
import ComputerToChoose from "../components/Pages/ChooseComputer/ListComputers";
import OrderList from "../components/Pages/Manage/OrderList/OrderList";
import Reciepts from "../components/Pages/Manage/Admin/RecieptManager/Reciepts";
// import Navbar from "../components/Pages/UserOder/Navbar";

const AppRoutes = () =>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/info' element={<UserInfo/>}/>
                {/* //admin */}
                <Route path='/manageAccount' element={
                    <PrivateRoute>
                        <TableAcount/>
                    </PrivateRoute>}
                />
                <Route path='/manageEmployee' element={
                    <PrivateRoute>
                        <TableEmployee/>
                    </PrivateRoute>}
                />
                <Route path='/reciept' element={
                    <PrivateRoute>
                        <Reciepts/>
                    </PrivateRoute>}
                />
                {/* employee */}
                <Route path='/manageUser' element={
                    <PrivateRoutesEmployee>
                        <TableUsers/>
                    </PrivateRoutesEmployee>}
                />
                <Route path='/computer' element={
                    <PrivateRoutesEmployee>
                        <Computer/>
                    </PrivateRoutesEmployee>}
                />
                <Route path='/OrderedList' element={
                    <PrivateRoutesEmployee>
                        <OrderList/>
                    </PrivateRoutesEmployee>}
                />
                {/* user */}
                <Route path='/user' element={
                    <PrivateRoutesUser>
                        <OrderContainer/>
                    </PrivateRoutesUser>}
                />
                <Route path='/chooseCOMP' element={
                    <PrivateRoutesUser>
                        <ComputerToChoose/>
                    </PrivateRoutesUser>}
                />
                <Route path="*" element={<NotFound/>}/>
            </Routes> 
        </>
    )
}

export default AppRoutes;