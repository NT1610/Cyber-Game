import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteComputer } from '../../../services/AdminService';
import { toast } from 'react-toastify';


const ModalDelete = (props) => {
  const [show, setShow] = useState(false);
  const [ComputerID,setComputerID]=useState("");
  const [dataComputerDelete,setDataComputerDelete]=useState([])

  const {item}=props
  const handleEditComputer =(Computer) =>{
    console.log(Computer)
    setDataComputerDelete(Computer)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditComputer(item);
  }

  const handleDeleteComputer = async() =>{
        let res = await deleteComputer(dataComputerDelete.comID
            );
        console.log(res)
        if(res && res.comID){
            handleClose();
            let string ='Del acc:'+String(dataComputerDelete.comID)
            toast.success(string)

        }
        else{
            alert('Error while deletting the Computer');
        }
  }
  useEffect(()=>{
    if(show){
        setComputerID(item.comID)
    }
  },[])
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
            Are You Sure To Delete Computer
        </form>
        <br/>

        <b>Computer ID : {item.comID}</b>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleDeleteComputer() }>Confirm</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;