import { loginApi} from "../../services/AdminService";
import { putUpdatePass } from "../../services/UserService";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

const ModalChangePass = (props) => {
  const [show, setShow] = useState(false);
  const [userName,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [newPass,setNewPass]=useState()
  const {userID}=props


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  const handleChangePasswordInfo = async() =>{
        const decoded= jwtDecode(localStorage.access_token)
        let user = JSON.stringify(
            `grant_type=&username=${userName}&password=${password }&scope=&client_id=&client_secret=`
        )
        let res = await loginApi(user);
        if(res && res.access_token && newPass !==''){
            const decoded1=jwtDecode(res.access_token)
            // console.log(res)
            console.log("check access_token: ",decoded1.account)
            console.log('check local token:',decoded.account)
            
            if( decoded1.account===decoded.account){

            
            let put= await putUpdatePass(decoded1.account,userName,newPass,decoded1.role)
            // console.log(newPass)
            // console.log(put)
            // console.log('check put?? ',decoded1.account,userName,newPass,decoded1.role)

            handleClose()
            let string ='Password was changed';
            toast.success(string)
            
            }
            else{alert('Error while change password');}
      }
      else{
        alert('Error while change password');
    }
  }

  return (
    <>
      <Button onClick={handleShow}                  
      className='btn btn-warning mx-3'
      >
        Change Password
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
            onChange={(event) => setUsername(event.target.value)}
            />
        </div>



        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="text"
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">New Password</label>
            <input type="text"
            className="form-control"
            onChange={(event) => setNewPass(event.target.value)}
            />
        </div>
        </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={() => handleChangePasswordInfo() }>Submit</button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalChangePass;

