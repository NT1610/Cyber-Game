import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { putUpdateComputer ,fetchComputer} from '../../../services/AdminService';
import { toast } from 'react-toastify';
import { fetchUserInfo } from '../../../services/UserService';
import { jwtDecode } from 'jwt-decode';



const ModalEdit = (props) => {
  const [show, setShow] = useState(false);
  const [ComID,setComID]=useState("");
  const [Area,setArea]=useState("");
  const [Status,setStatus]=useState("");
  const [id,setId]=useState('');
  const [datacompEdit,setDatacompEdit]=useState([])
  const [isOn, setIsOn] = useState(false);
  useEffect(()=>{
    if(show){
      // comID: 3, area: 'B', status: 'OFF'
        if(datacompEdit.status === "ON"){
          getUserInfo()
          setIsOn(true)
        }
        setComID(datacompEdit.comID)
        setArea(datacompEdit.area)
        setStatus(datacompEdit.status)
    }
  },[datacompEdit])

  const handleToggle = () => {
    setIsOn(!isOn);
    if (isOn){
      setStatus("OFF")
    }
    else{
      setStatus('ON')
    }

  };

  // const decoded= jwtDecode(localStorage.access_token);
  const [userID, setUserID] = useState();

  const getUserInfo = async() =>{
      let user = await fetchComputer(datacompEdit.comID);
      console.log('check user>>',user)
      setUserID(user.userID)
  }

  const {item,}=props
  const handleEditcomp =(comp) =>{
    setDatacompEdit(comp)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditcomp(item);
  }

  const handleEditcompInfo = async() =>{
        let connect = {
          userID:parseInt(userID),
          comID:ComID,
          startTime:"2024-01-09T00:36:47.335Z"
        }
        let computer = {
          area:Area,
          status:Status
        }
        let res = await putUpdateComputer(connect,computer,ComID);
        console.log('check>>:',connect,computer,ComID)
        console.log('check Update',res)
        
        if(res){
          handleClose()
          let string ='Updated Comp:'+String(id)
          toast.success(string)

      }
      else{
        alert('Error while save new the ComID');
    }
  }

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
            <label className="form-label">ComID</label>
            {/* <input type="text" 
            className="form-control"
            value={ComID}
            onChange={(event) => setComID(event.target.value)}
            /> */}
            <b> : {ComID}</b>
        </div>

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
        <div className="mb-3">
            <label className="form-label">User ID</label>
            <input type="text"
            className="form-control"
            value={userID}
            onChange={(event) => setUserID(event.target.value)}
            />
        </div>
        
        <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={isOn ? "ON" : "OFF"}
                        checked={isOn}
                        onChange={handleToggle}
                      />
                    </Form>
        
        </form>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleEditcompInfo() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;