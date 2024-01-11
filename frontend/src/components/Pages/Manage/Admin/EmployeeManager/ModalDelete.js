import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteEmployee } from '../../../../services/AdminService';
import { toast } from 'react-toastify';


const ModalDelete = (props) => {
  const [show, setShow] = useState(false);
  const {item}=props
  const handleEditUser =(user) =>{
    console.log(user)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditUser(item);
  }

  const handledeleteAccount = async() =>{
        let res = await deleteEmployee(item.accountID);
        console.log(">>res: ",res)
        console.log(">>code: ",res.statusCode)

        if(res && res.accountID){
            handleClose();
            let string ='Del employee acc:'+String(item.accountID)
            toast.success(string)
        }
        else{
          alert('Error while deletting the Computer');
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
            Are You Sure To Delete User
        </form>
        <br/>
        <b>Account ID: {item.accountID}</b>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handledeleteAccount() }>Confirm</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;