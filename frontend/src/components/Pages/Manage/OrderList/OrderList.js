
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllOrder } from '../../../services/AdminService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { CSVLink } from "react-csv";
import '../../../../scss/Table.scss'


const OrderList =() =>{
    const [totalPages,setTotalPages]= useState(0);
    const [originList,setOriginList]=useState([]);
  
    useEffect(()=>{
      getUsers();
    },[])
  
  
    const getUsers= async()=>{
      let res = await fetchAllOrder();
      if(res){
        setOriginList(res.sort((a, b) => ( a.orderID) - ( b.orderID)))
      }
    }

      return (
          <>
          <div className='col-12 col-sm-4 my-3'>
          </div>
          <div className="d-sm-flex justify-content-between">
            <span >Order List:</span>
            <div className='func-button'>
              <CSVLink 
              filename={"myListOrder.csv"}
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
                        order index
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                        UserID
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                        FoodID ID
                      </div>
                  </th>
                  <th>
                      <div className='sort-header'>                  
                        Quantity
                      </div>
                  </th>
                  <th className='sort-header'><div>Order Time</div></th>
                  <th >Status</th>

                </tr>
              </thead>
              <tbody>
                {originList && originList.length>0 &&
                originList.map((item,index) =>{
                  return(
                    <tr key={`user${index}`}>
                        <td>{item.orderID}</td>
                        <td>{item.userID}</td>
                        <td>{item.foodID}</td>
                        <td>{item.quantity}</td>
                        <td>{item.orderTime}</td>
                        <td>{item.status}</td>
                        <td>
                          <ModalEdit 
                          item={item}
                          />
                          <ModalDelete                      
                          item={item}
                          index={item.orderID}
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



export default OrderList
