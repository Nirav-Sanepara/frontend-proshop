import axios from 'axios';
const token = localStorage.getItem('token');
const apiClient = () =>{
    const headers= {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
}
// const apiClient = axios.create({
//   baseURL: `${process.env.REACT_APP_API_BASE_PATH}`, // Your API base URL
//   timeout: 1000, // Adjust timeout as needed

// });
export default apiClient;