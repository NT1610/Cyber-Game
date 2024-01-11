import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteOrder } from '../../../services/AdminService';
import { toast } from 'react-toastify';


const ModalDelte = (props) => {
  const [show, setShow] = useState(false);

  const {item}=props
  const {index}=props
  const handleEditOrder =(user) =>{
    console.log(user)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditOrder(item);
  }

  const handleDeleteOrder = async() =>{
        let res = await deleteOrder(index);
        console.log(">>res: ",res)
        console.log(">>code: ",res.statusCode)

        if(res && res.orderID){
            handleClose();
            let string ='Del orrder:'+String(index)
            toast.success(string)
        }
  }

  return (
    <>
      <Button onClick={handleShow}                  
      className='btn btn-danger'>
        Delete</Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form >
            Are You Sure To Delete Order
        </form>
        <br/>
        <b> Order ID : {index}</b>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleDeleteOrder() }>Confirm</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default  ModalDelte