
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllEmployee ,fetchAllWork,fetchWork} from '../../../../services/AdminService';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { CSVLink } from "react-csv";
import '../../../../../scss/Table.scss'

const TableEmployee =() =>{
    const [originList,setOriginList]=useState([]);
    const [WorkList,setWorkList]=useState([]);

  
    useEffect(()=>{
      getEmployees();
      getAllWorks();
    },[])
  
  
    const getEmployees= async()=>{
      let res = await fetchAllEmployee();
      if(res){
        setOriginList(res.reverse())
      }
    }
    const getAllWorks= async()=>{
      let res = await fetchAllWork();
      if(res){
        setWorkList(res.reverse())
      }
    }
      return (
          <>
          <div className='col-12 col-sm-4 my-3'>
          </div>
          <div className="d-sm-flex justify-content-between">
            <span >List Employee:</span>
            <div className='func-button'>
              <CSVLink 
              filename={"myListAccount.csv"}
              className="btn btn-primary"
              target="_blank"
              data={originList}>
              <i className='fa-solid fa-file-arrow-down'/>
              Export File
              </CSVLink>
              <ModalAddNew/>
            </div>
          </div>
          <div className='customize-table'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                      <div className='sort-header'>                  
                         ID
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                        Account ID
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                        Name
                      </div>
                  </th>
                  <th className='sort-header'><div>Phone</div></th>
                  <th >Birthday</th>
                  <th >Position</th>
                  <th >Salary</th>

                </tr>
              </thead>
              <tbody>
                {originList && originList.length>0 &&
                originList.map((item,index) =>{
                  return(
                    <tr key={`user${index}`}>
                        <td>{item.id}</td>
                        <td>{item.accountID}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.birth}</td>
                        <td>{item.position}</td>
                        <td>{item.salary}</td>
                        <td>
                          <ModalEdit 
                          item={item}
                          />
                          <ModalDelete                      
                          item={item}
                          />
                        </td>
                  </tr>
                  )
                })
                }
              </tbody>
            </Table>
          </div>
          <div className='col-12 col-sm-4 my-3'>
          </div>
          <div className="d-sm-flex justify-content-between">
            <span >List Employee:</span>
            <div className='func-button'>
              <CSVLink 
              filename={"WorkList.csv"}
              className="btn btn-primary"
              target="_blank"
              data={originList}>
              <i className='fa-solid fa-file-arrow-down'/>
              Export File
              </CSVLink>
              <ModalAddNew/>
            </div>
          </div>
          <div className='customize-table'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                      <div className='sort-header'>                  
                      Employee  ID
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                      Status
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                      Start Time
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                      End Time
                      </div>
                  </th>


                </tr>
              </thead>
              <tbody>
                {WorkList && WorkList.length>0 &&
                WorkList.map((item,index) =>{
                  return(
                    <tr key={`user${index}`}>
                        <td>{item.employeeID}</td>
                        <td>{item.status}</td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                  </tr>
                  )
                })
                }
              </tbody>
            </Table>
          </div>
          </>
        );
}



export default TableEmployee
