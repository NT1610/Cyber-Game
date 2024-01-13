
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllReciept } from '../../../../services/AdminService';
import ReactPaginate from 'react-paginate';
// import ModalAddNew from './ModalAddNew';
// import ModalEdit from './ModalEdit';
// import ModalDelete from './ModalDelete';
import { CSVLink } from "react-csv";
import '../../../../../scss/Table.scss'


const Reciepts =() =>{
    const [totalPages,setTotalPages]= useState(0);
    const [originList,setOriginList]=useState([]);
  
    useEffect(()=>{
      getReciepts();
    },[originList])
  
  
    const getReciepts= async()=>{
      let res = await fetchAllReciept();
      if(res){
        setOriginList(res.reverse())
      }
    }

      return (
          <div className='background'>
          <div className='col-12 col-sm-4 my-3'>
          </div>
          <div className="d-sm-flex justify-content-between">
            <div className='router-title' >Receipt</div>
            <div className='func-button'>
              <CSVLink 
              filename={"myListReciept.csv"}
              className="btn btn-primary"
              target="_blank"
              data={originList}>
              <i className='fa-solid fa-file-arrow-down'/>
              Export File
              </CSVLink>
              {/* <ModalAddNew
              /> */}
            </div>
          </div>
          <div className='customize-table'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                      <div className='sort-header'>                  
                      Receipt ID
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                      User ID
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                      Description
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                      Money
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                      Time
                      </div>
                  </th>

                </tr>
              </thead>
              <tbody>
                {originList && originList.length>0 &&
                originList.map((item,index) =>{
                  return(
                    <tr key={`user${index}`}>
                        <td>{item.receiptID}</td>
                        <td>{item.userID}</td>
                        <td>{item.description}</td>
                        <td>{item.money}</td>
                        <td>{item.time}</td>
                        {/* <td>
                          <ModalEdit 
                          item={item}
                          />
                          <ModalDelete                      
                          item={item}
                          />
                        </td> */}
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
          </div>
        );
}



export default Reciepts
