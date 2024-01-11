import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateEmployee } from '../../../../services/AdminService';
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {
  const [show, setShow] = useState(false);
  const [Account,setAccount]=useState(0);
  const [Name,setName]=useState("");
  const [Birth,setBirth]=useState("");
  const [ID,setID]=useState("");
  const [Phone,setPhone]=useState("");
  const [Position,setPosition]=useState("");
  const [Salray,setSalray]=useState(0);

  const handleSaveAccount = async()=>{
  let res = await postCreateEmployee(Account,Name,"2024-01-11",ID,Phone,Position,Salray);

    console.log(">>>> check res: ",res)
    console.log('>>check input >>',parseInt(Account),Birth,Name,ID,Phone,Position,parseInt(Salray))
    if(res&& res.accountID){
        handleClose();
        setAccount('');
        setName('');
        setBirth('');
        toast.success("An Account Added")
    }
    else{
        alert('Error while saving the Account');
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className='btn btn-success'>
      <i className='fa-solid fa-circle-plus'/>
            Add Employee
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
        <div className="mb-3">
            <label className="form-label">accountID</label>
            <input type="text" 
            className="form-control"
            value={Account}
            onChange={(event) => setAccount(event.target.value)}
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
            <label className="form-label">Position</label>
            <input type="text"
            className="form-control"
            value={Position}
            onChange={(event) => setPosition(event.target.value)}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Salary</label>
            <input type="text"
            className="form-control"
            value={Salray}
            onChange={(event) => setSalray(event.target.value)}
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