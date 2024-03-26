import axios from "axios";

const token = localStorage.getItem("token");

const registerUserHandler = ({name,email,password,role}) => {
    
       return axios.post(`${process.env.REACT_APP_API_BASE_PATH}/api/users`,{name,email,password,role:role||'user'})
    
}

const loginUserHandler = ({email,password}) =>{
    return axios.post(`${process.env.REACT_APP_API_BASE_PATH}/api/users/login`,{email,password})
}

const updateUserProfileHandler = () => {
    return axios.post(`${process.env.REACT_APP_API_BASE_PATH}/api/users`)
}

const userDeactiveHandler = (id) => {
    const isActive = false
    return axios.put(`${process.env.REACT_APP_API_BASE_PATH}/api/users/${id}`,{isActive},{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    })
}

const getUserProfileHandler = () => {
    return axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    })
}

const getProfileOfUserByParameterId = (id) => {
    return axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${id}`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    })
}

const updateUserProfileByIdHandler = ({id,name,email,password}) =>{
    // id:userInfo._id, name:values.name, email:values.email, password : values.password
    return axios.put(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${id}`,{name,email,password},{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    })
}

const allUserDataGetApiHandler = async() =>{
   
    const data= await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    })
    // console.log(data,'ppppppppppppp')
    return data
}

const forgotPasswordHandler = (email) => {
    return axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/forgot-password/${email}`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
}

const getProductsByMerchantId = () => {
  const Api = `${process.env.REACT_APP_API_BASE_PATH}/api/products/all/products`;
 
    
   return axios.get(Api, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
    
   
  

}

const resetPasswordHandler = ({userId,password}) => {
    return  axios.patch(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/reset-password/${userId}/${token}`,
        {
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
}







export {
    registerUserHandler,
    loginUserHandler,
    userDeactiveHandler,
    getUserProfileHandler,
    getProfileOfUserByParameterId,
    updateUserProfileByIdHandler,
    allUserDataGetApiHandler,
    forgotPasswordHandler,
    resetPasswordHandler,
    getProductsByMerchantId
}