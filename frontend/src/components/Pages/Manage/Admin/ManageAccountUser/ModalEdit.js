import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateAccountUser } from '../../../../services/AdminService';
import { toast } from 'react-toastify';


const ModalEdit = (props) => {
  const [show, setShow] = useState(false);
  const [Account,setAccount]=useState("");
  const [Role,setRole]=useState("");
  const [Password,setPassword]=useState("");
  const [id,setId]=useState('');
  const [dataUserEdit,setDataUserEdit]=useState([])

  const {item}=props
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
        console.log("check input: ",id,Account,Password,Role)
        let res = await putUpdateAccountUser(id,Account,Password,Role);
        console.log('check Update',res)
        
        if(res && res.account){
          handleClose()
          let string ='Updated acc:'+String(id)
          toast.success(string)

      }
      else{
        alert('Error while save new the Account');
    }
  }
  useEffect(()=>{
    if(show){
        setAccount(dataUserEdit.account)
        setRole(dataUserEdit.role)
        setId(dataUserEdit.accountID)
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
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" 
            className="form-control"
            value={Account}
            onChange={(event) => setAccount(event.target.value)}
            />
        </div>

        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Role</label>
            <input type="text"
            className="form-control"
            value={Role}
            onChange={(event) => setRole(event.target.value)}
             />
        </div>

        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="text"
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
          <button type="submit" className="btn btn-primary" onClick={() => handleEditUserInfo() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;