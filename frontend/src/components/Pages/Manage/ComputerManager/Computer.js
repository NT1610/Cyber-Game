import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { fetchAllComputer } from '../../../services/AdminService';
import active from '../../../../assets/computer/Active.png';
import broken from '../../../../assets/computer/Broken.png';
import ModalAddNew from './ModalAddNew';
import ModalDelete from '../Admin/AccountManger/ModalDelete';
import '../../../../scss/Table.scss'
import ModalEdit from './ModalEdit';



const Computer = () => {
    const [computers, setComputers] = useState([]);
    const [userID, setUserID] = useState('0');


    useEffect(()=>{
        getComputer();
      },[])


    const getComputer= async()=>{
        let res = await fetchAllComputer();
        if(res){
          setComputers(res.sort((a, b) => a.comID - b.comID))
        }
      }
      const handleUpdateTable = (computer) =>{
        setComputers([computer, ...computers])
      }
      // const handleDeleteTableFromModal = (user) =>{
      //   let cloneListIsers = _.cloneDeep(computers);
      //   console.log("Deleted clone>> :",cloneListIsers)
      //   cloneListIsers =cloneListIsers.filter(item =>item.accountID !== user.accountID)
      //   setComputers(cloneListIsers)
      // }
    return (
        <Container>
            <span >Computer List:</span>
            <div className='func-button'>
              <ModalAddNew
              handleUpdateTable={handleUpdateTable}
              />
            </div>
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

                    
                    <ModalDelete                      
                          item={computer}
                    />
                    <ModalEdit                      
                          item={computer}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        // <>Hello</>
    );

}
export default Computer