import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"
import {jwtDecode} from "jwt-decode";


const PrivateRoutesEmployee = (props) =>{
    let decoded = '';
    if (localStorage.access_token){
        decoded= jwtDecode(localStorage.access_token);
    }
    const user = useSelector(state => state.user.account)
    if(!user || (decoded.role!=='Employee' && decoded.role!=='Admin')  ){
        return(
        <Alert variant="danger" dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
            Permission Denied
            </p>
        </Alert>
    )
}
    return(
        <>
            {props.children}
        </>    
    )
}
export default  PrivateRoutesEmployee