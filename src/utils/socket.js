// // import toast from 'react-hot-toast';
// // import { io } from 'socket.io-client';

// // const SOCKET_SERVER_URL = 'http://localhost:3001';
// // const socket = io(SOCKET_SERVER_URL);

// // const handleConnect = () => {
// //   console.log('Connected to server');
// // };

// // const handleHello = (res) => {
// //   toast.success(res.message);
// // };

// // // Establish connection to the server
// // socket.on('connect', handleConnect);

// // // Listen for 'hello' event from the server
// // socket.on('hello', handleHello);

// // export default socket;

// import toast from 'react-hot-toast';
// import { io } from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:3001';
// const socket = io.connect(SOCKET_SERVER_URL);

// const handleConnect = () => {
//   console.log('Connected to server');
// };

// const handleHello = (res) => {
//   toast.success(res.message);
// };

// export const handleAddUser = (data) => {
//   console.log('New user added:', data);
//   // Optionally, you can show a toast message or update the UI
//   socket.emit('addUser',data)
//   toast.success('New user added');
// };

// export const handleProductAdd = (data) => {
//     console.log('updated product successfully')
//     socket.emit('addProduct',data)
//   toast.success('New product added');
// }

// socket.on('connect', handleConnect);

// // Listen for 'hello' event from the server
// socket.on('hello', handleHello);

// // Listen for 'addUser' event from the server
// socket.on('addUser', handleAddUser);

// socket.on('addProduct', handleProductAdd)
// // socket.on('updateUser',handleUpdateUser)

// export const socketInstance = socket;


// import toast from 'react-hot-toast';
// import { io } from 'socket.io-client';
// const SOCKET_SERVER_URL = 'http://localhost:3001';
// const socket = io(SOCKET_SERVER_URL);
// const handleConnect = () => {
//   console.log('Connected to server');
// };
// const handleHello = (res) => {
//   toast.success(res.message);
// };
// // Establish connection to the server
// socket.on('connect', handleConnect);
// // Listen for 'hello' event from the server
// socket.on('hello', handleHello);
// export default socket;
// import toast from 'react-hot-toast';

import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
const SOCKET_SERVER_URL = 'http://localhost:3001';
const socket =io(SOCKET_SERVER_URL);
socket.on('connect',()=>{
  toast.success("Connected to server")
})
export const socketInstance = socket;