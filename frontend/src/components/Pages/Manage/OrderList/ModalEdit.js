import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../../../services/AdminService';
import { toast } from 'react-toastify';

const ModalEdit = (props) => {
  const [show, setShow] = useState(false);
  const [userID,setuserID]=useState("");
  const [FoodID,setFoodID]=useState("");
  const [Quantity,setQuantity]=useState("");
  const [OrderTime,setOrderTime]=useState("");
  const [Status,setStatus]=useState('');

  const [dataUserEdit,setDataUserEdit]=useState([])

  const {item,}=props
  const handleEditUser =(user) =>{
    console.log(user)
    setDataUserEdit(user)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditUser(item);
  }


  const handleEditUserInfo = async() =>{
        let res = await putUpdateUser(userID,FoodID,Quantity,OrderTime,Status);
        if(res && res.userID){
          handleClose()
          let string ='Updated user:'+String(userID)
          toast.success(string)

      }
      else{
        alert('Error while save new the Account');
      }

  }
  useEffect(()=>{
    if(show){
        setuserID(dataUserEdit.userID)
        setFoodID(dataUserEdit.foodID)
        setQuantity(dataUserEdit.quantity)
        setOrderTime(dataUserEdit.orderTime)
        setStatus(dataUserEdit.status)
    }
  },[dataUserEdit])
  return (
    <>
      <Button onClick={handleShow}                  
      className='btn btn-warning mx-3'
      >
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
          {/* FoodID,Name,OrderTime,ID,Status,Money */}
        <div className="mb-3">
            <label className="form-label">Food ID</label>
            <input type="text" 
            className="form-control"
            value={FoodID}
            onChange={(event) => setFoodID(event.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input type="text" 
            className="form-control"
            value={Quantity}
            onChange={(event) => setQuantity(event.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Order Time</label>
            <input type="text" 
            className="form-control"
            value={OrderTime}
            onChange={(event) => setOrderTime(event.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label"> Status</label>
            <input type="text" 
            className="form-control"
            value={Status}
            onChange={(event) => setStatus(event.target.value)}
            />
        </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleEditUserInfo() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;