import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateComputer } from '../../../services/AdminService';
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {
  const [show, setShow] = useState(false);
  const [Area,setArea]=useState("");
  const [Status,setStatus]=useState("");



  const handleSaveComputer = async()=>{
    let res = await postCreateComputer(Area,Status);
    if(res&& res.comID){
        handleClose();
        setArea('');
        setStatus('');
        // navigate('/Computers')
        toast.success("An Computer Added")
    }
    else{
        alert('Error while saving the Computer');
    }
    console.log(Area,Status)
    console.log(res)
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className='btn btn-success'>
      <i className='fa-solid fa-circle-plus'/>
            Add Computer
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
        <div className="mb-3">
            <label className="form-label">Area</label>
            <input type="text" 
            className="form-control"
            value={Area}
            onChange={(event) => setArea(event.target.value)}
            />
        </div>

        <div className="mb-3">
            <label className="form-label">Status</label>
            <input type="text"
            className="form-control"
            value={Status}
            onChange={(event) => setStatus(event.target.value)}
             />
        </div>

        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        </div>

        </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleSaveComputer() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;