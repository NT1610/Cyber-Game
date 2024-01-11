import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../../../services/AdminService';
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {
  const [show, setShow] = useState(false);
  const [AccountID,setAccountID]=useState("");
  const [Name,setName]=useState("");
  const [Birth,setBirth]=useState("");
  const [ID,setID]=useState("");
  const [Phone,setPhone]=useState("");
  const [Money,setMoney]=useState("");


  const {handleUpdateTable}=props

  const handleSaveUser = async()=>{
    // AccountID,name,birth,id,phone,money
    let res = await postCreateUser(AccountID,Name,Birth,ID,Phone,Money);
    console.log(">>>> check res: ",AccountID,Name,Birth,ID,Phone,Money)
    if(res&& res.accountID){
        handleClose();
        setAccountID('');
        setName('');
        setBirth('');
        setID('');
        setPhone('');
        setMoney('');
        // navigate('/users')
        toast.success("An User Added")
        handleUpdateTable(res)
    }
    else{
        alert('Error while saving the user');
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className='btn btn-success'>
      <i className='fa-solid fa-circle-plus'/>
            Add User
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
        <div className="mb-3">
            <label className="form-label">AccountID</label>
            <input type="text" 
            className="form-control"
            value={AccountID}
            onChange={(event) => setAccountID(event.target.value)}
            />
        </div>

        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text"
            className="form-control"
            value={Name}
            onChange={(event) => setName(event.target.value)}
             />
        </div>

        <div className="mb-3">
            <label className="form-label">Birth</label>
            <input type="text"
            className="form-control"
            value={Birth}
            onChange={(event) => setBirth(event.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">ID</label>
            <input type="text"
            className="form-control"
            value={ID}
            onChange={(event) => setID(event.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text"
            className="form-control"
            value={Phone}
            onChange={(event) => setPhone(event.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Money</label>
            <input type="text"
            className="form-control"
            value={Money}
            onChange={(event) => setMoney(event.target.value)}
            />
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>

        </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleSaveUser() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;