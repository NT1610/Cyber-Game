import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateComputer ,fetchConnect} from '../../services/UserService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from '../../../Redux/actions/userAction';
import { fetchUserInfo } from '../../services/UserService';

const TurnOn = (props) => {
  const [show, setShow] = useState(false);
  const [ComID,setComID]=useState("");
  const [Area,setArea]=useState("");
  const [Status,setStatus]=useState("");
  const [id,setId]=useState('');
  const [datacompEdit,setDatacompEdit]=useState([])
  const [pickedComp, setPickedComp] = useState("");


  // const [pickComp, setPickComp] = useState('');
  // const [pickCompArea, setPickCompArea] = useState('');
  const dispatch =useDispatch();

  useEffect(()=>{
    getCompInfo()
    if(show){
      // comID: 3, area: 'B', status: 'OFF'
        setComID(datacompEdit.comID)
        setArea(datacompEdit.area)
        setStatus(datacompEdit.status)
    }
  },[datacompEdit])

  const {item,userID}=props
  const handleEditcomp =(comp) =>{
    setDatacompEdit(comp)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    handleEditcomp(item);
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
        let connect = {
          userID:parseInt(userID),
          comID:ComID,
          startTime:"2024-01-09T00:36:47.335Z"
        }
        let computer = {
          area:Area,
          status:"ON"
        }
        console.log("pickedComp>>>>",pickedComp)
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
          let res = await putUpdateComputer(connectOff,computerOff,pickedComp);
          console.log('check turn off>>',res)
          console.log('check turn off>>',connectOff,computerOff,pickedComp)
        }
        // localStorage.setItem('pickComp',ComID)
        // localStorage.setItem('pickCompArea',Area)

        let res = await putUpdateComputer(connect,computer,ComID);
        console.log('check Update',res)
        console.log('check turn on>>:',connect,computer,ComID)

        
        if(res){
          handleClose()
          let string ='TURN ON COMP:'+String(id)
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
      else{
        alert('Error while save new the ComID');
    }
  }

  return (
    <>
      <Button onClick={handleShow}                  
      className='btn btn-warning mx-3'
      >
        {(localStorage.chose && localStorage.chose==='true')? "CHANGE COMP": "TURN ON" }
         
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Xác nhận chọn máy</Modal.Title>
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

export default TurnOn;