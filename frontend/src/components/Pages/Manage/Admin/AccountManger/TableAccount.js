
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllAccount } from '../../../../services/AdminService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { CSVLink } from "react-csv";
import '../../../../../scss/Table.scss'


const TableAccount =() =>{
    const [totalPages,setTotalPages]= useState(0);
    const [originList,setOriginList]=useState([]);
  
    useEffect(()=>{
      getUsers();
    },[originList])
  
  
    const getUsers= async()=>{
      let res = await fetchAllAccount();
      if(res){
        setOriginList(res.sort((a, b) => a.accountID - b.accountID))
      }
    }

      return (
          <>
          <div className='col-12 col-sm-4 my-3'>
          </div>
          <div className="d-sm-flex justify-content-between">
            <span >List Account:</span>
            <div className='func-button'>
              <CSVLink 
              filename={"myListAccount.csv"}
              className="btn btn-primary"
              target="_blank"
              data={originList}>
              <i className='fa-solid fa-file-arrow-down'/>
              Export File
              </CSVLink>
              <ModalAddNew
              />
            </div>
          </div>
          <div className='customize-table'>
            <Table striped bordered hover>
              <thead>
                <tr>
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
                  <th>
                      <div className='sort-header'>                  
                        Role
                      </div>
                  </th>

                </tr>
              </thead>
              <tbody>
                {originList && originList.length>0 &&
                originList.map((item,index) =>{
                  return(
                    <tr key={`user${index}`}>
                        <td>{item.accountID}</td>
                        <td>{item.account}</td>
                        <td>{item.role}</td>

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
          <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          />
          </>
        );
}



export default TableAccount
