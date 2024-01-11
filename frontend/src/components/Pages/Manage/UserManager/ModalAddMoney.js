import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../../../services/AdminService';
import { toast } from 'react-toastify';

const ModalEdit = (props) => {
  const [show, setShow] = useState(false);
  const [userID,setuserID]=useState("");
  const [AccountID,setAccountID]=useState("");
  const [Name,setName]=useState("");
  const [Birth,setBirth]=useState("");
  const [ID,setID]=useState('');
  const [Phone,setPhone]=useState('');
  const [Money,setMoney]=useState(0);

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
        let res = await putUpdateUser(userID,AccountID,Name,Birth,ID,Phone,parseInt(dataUserEdit.money)+parseInt(Money));
        if(res && res.userID){
          handleClose()
          let string ='Added Noney for user:'+String(userID)
          toast.success(string)

      }
      else{
        alert('Error while add Money');
      }

  }
  useEffect(()=>{
    if(show){
        setuserID(dataUserEdit.userID)
        setAccountID(dataUserEdit.accountID)
        setName(dataUserEdit.name)
        setBirth(dataUserEdit.birth)
        setID(dataUserEdit.id)
        setPhone(dataUserEdit.phone)
    }
  },[dataUserEdit])
  return (
    <>
      <Button onClick={handleShow}                  
      className='btn btn-warning mx-3'
      >
        Add Money
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Số tiền nạp vào</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
          {/* AccountID,Name,Birth,ID,Phone,Money */}
        <div className="mb-3">
            <label className="form-label">Account ID: <b>{AccountID}</b></label>
        </div>
        <div className="mb-3">
            <label className="form-label">Name: <b>{Name}</b></label>
        </div>
        <div className="mb-3">
            <label className="form-label">Birth: <b>{Birth}</b></label>
        </div>
        <div className="mb-3">
            <label className="form-label">ID: <b>{ID}</b></label>
        </div>
        <div className="mb-3">
            <label className="form-label">Phone: <b>{Phone}</b></label>
        </div>
        <div className="mb-3">
            <label className="form-label"> Money</label>
            <input type="text" 
            className="form-control"
            value={Money}
            onChange={(event) => setMoney(event.target.value)}
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