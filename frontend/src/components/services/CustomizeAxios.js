// Get url of backend
import axios  from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:8000'
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : {statusCode : response.status};
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let res ={};
    if(error.response){
      res.data=error.response.data
      res.status=error.response.status
      res.header=error.response.header
    }
    else if(error.request){
      console.log("Error Request", error.request)
    }
    else{
      console.log(error.message);
    }
    return res;
  });
export default instance;