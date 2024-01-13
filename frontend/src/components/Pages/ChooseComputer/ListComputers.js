import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { fetchAllComputer,fetchUserInfo } from '../../services/UserService';
import active from '../../../assets/computer/Active.png';
import broken from '../../../assets/computer/Broken.png';
// import ModalAddNew from './ModalAddNew';
// import ModalDelete from '../Admin/AccountManger/ModalDelete';
import '../../../scss/Table.scss'
import TurnOn from './TurnOnComp';
import TurnOff from './TurnOffComp';
import { jwtDecode } from 'jwt-decode';



const ComputerToChoose = () => {
    const [computers, setComputers] = useState([]);
    const decoded= jwtDecode(localStorage.access_token);
    const [userID, setUserID] = useState('0');

    useEffect(()=>{
        getComputer();
        getUserInfo()
      },[computers])
    const getComputer= async()=>{
        let res = await fetchAllComputer();
        if(res){
          setComputers(res.sort((a, b) => a.comID - b.comID))
        }
    }
    const handleUpdateTable = (computer) =>{
      setComputers([computer, ...computers])
    }
    const getUserInfo = async() =>{
      let user = await fetchUserInfo(decoded.account);
      setUserID(user.userID)
      console.log('check user>>',user)
    }

    return (
      <div className='background'>
        <Container>

            {/* <TurnOff userID={userID}/> */}
          <Row>
            {computers.map(computer => (
              <Col key={computer.comID} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>ID:{computer.comID}</Card.Title>
                    <div className="image_box">
                    {computer.status== "BROKEN"
                      ? <img src={active} 
                        alt="Image" />
                      : <img src={broken} 
                      alt="Image" />
                    }
                    </div>
                    <Card.Text>Area: {computer.area}</Card.Text>
                    <Card.Text>Status: {computer.status}</Card.Text>
                    {/* <ModalDelete                      
                          item={computer}
                    /> */}
                    {computer.status === 'OFF' && 
                    <TurnOn
                      item={computer}
                      userID={userID}
                    />}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
       </div>
    );

}
export default ComputerToChoose