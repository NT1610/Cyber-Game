import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateComputer ,fetchConnect} from '../../services/UserService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from '../../../Redux/actions/userAction';
import { fetchUserInfo } from '../../services/UserService';

const TurnOff = (props) => {
  const [show, setShow] = useState(false);
  const [ComID,setComID]=useState("");
  const [Area,setArea]=useState("");
  const [Status,setStatus]=useState("");
  const [id,setId]=useState('');
  const [pickedComp, setPickedComp] = useState("");


  // const [pickComp, setPickComp] = useState('');
  // const [pickCompArea, setPickCompArea] = useState('');
  const dispatch =useDispatch();

  useEffect(()=>{
    getCompInfo()
    if(show){

    }
  },[])

  const {userID}=props
 

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  const getCompInfo = async() =>{
    let comp = await fetchConnect(userID);
    console.log('checkcomp',comp,userID)
    if(comp.comID){
      setPickedComp(comp.comID)
      localStorage.setItem('chose',true)
    }
    console.log('check picked comp',pickedComp)
  }

  const handleEditcompInfo = async() =>{
        if(pickedComp &&pickedComp !==""){
          let connectOff = {
            userID:parseInt(userID),
            comID:pickedComp,
            startTime:"2024-01-09T00:36:47.335Z"
          }
          let computerOff = {
            area:'A',//area dang chua lay dc api :)) clm nhu nay cung k can lay area nua
            status:"OFF"
          }
          localStorage.setItem('chose',false)
          let res = await putUpdateComputer(connectOff,computerOff,pickedComp);
          console.log('check turn off>>',res)
          console.log('check turn off>>',connectOff,computerOff,pickedComp)
          if(res){
            handleClose()
            let string ='TURN OFF COMP:'+String(id)
            toast.success(string)
            const loginedTime= new Date();
            const hours = loginedTime.getHours();
            const minutes = loginedTime.getMinutes();
            const seconds = loginedTime.getSeconds();
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            if(localStorage.chose === "false"){
      
              localStorage.setItem('chose',true)
              localStorage.setItem('timeStart',formattedTime)
            }
            dispatch(handleRefresh())
            }
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
        {(localStorage.chose && localStorage.chose==='true')? "TURN OFF": "" }
         
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Xác nhận tắt máy</Modal.Title>
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
            {/* <input type="text"
            className="form-control"
            value={Area}
            onChange={(event) => setArea(event.target.value)}
             /> */}
            <b> : {Area}</b>

        </div>

        {/* <div className="mb-3">
            <label className="form-label">Status</label>
            <input type="text"
            className="form-control"
            value={Status}
            onChange={(event) => setStatus(event.target.value)}
            />
        </div> */}
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

export default TurnOff;