import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateAccount,postCreateUser} from '../../../../services/AdminService';
import { toast } from 'react-toastify';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';


const ModalAddNew = (props) => {
  const [show, setShow] = useState(false);
  const [Account,setAccount]=useState("");
  const [Role,setRole]=useState("User");
  const [Password,setPassword]=useState("");
  const pickRole = "ROLE :"+Role
  const handleSaveAccount = async()=>{
  let res = await postCreateAccount(Account,Password,Role);
    console.log(">>>> check res: ",res)
    if(res&& res.accountID){
        handleClose();
        setAccount('');
        // setRole('');
        setPassword('');
        toast.success("An Account Added")
        if(Role=== 'User'){
          // accountID,name,birth,id,phone,money
          let user = await postCreateUser(res.accountID,'','2024-01-13','','',0);
          console.log('new user added ',user)
        }
    }
    else{
        alert('Error while saving the Account');
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChooseRole = (role) => {
    if (role === 'User') {
      setRole('User');
    } else if (role === 'Employee') {
      setRole('Employee');
    }
  }
  

  return (
    <>
      <Button onClick={handleShow} className='btn btn-success'>
      <i className='fa-solid fa-circle-plus'/>
            Add Account
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
        <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" 
            className="form-control"
            value={Account}
            onChange={(event) => setAccount(event.target.value)}
            />
        </div>

        <div>
        <Nav>
                <NavDropdown title= {pickRole}>
                <NavDropdown.Item onClick={() => handleChooseRole('User')}>User</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChooseRole('Employee')}>Employee</NavDropdown.Item> 
                </NavDropdown>
              </Nav>

        </div>

        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password"
            className="form-control"
            value={Password}
            onChange={(event) => setPassword(event.target.value)}
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
          <button type="submit" className="btn btn-primary" onClick={() => handleSaveAccount() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;