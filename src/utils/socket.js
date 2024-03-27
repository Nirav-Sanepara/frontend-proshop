
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


////////////////////////// main thing //////////////////////////////////////


import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = `${process.env.REACT_APP_API_BASE_PATH}`;
const socket =io(SOCKET_SERVER_URL);

socket.on('connect',()=>{
  toast.success("Connected to server")
})

export const socketInstance = socket;



////////////////////////////////////main thing end ///////////////////////////////




// import toast from 'react-hot-toast';
// import { io } from 'socket.io-client';

// const SOCKET_SERVER_URL = `${process.env.REACT_APP_API_BASE_PATH}`;
// const socket = io(SOCKET_SERVER_URL);

// // Handle connection success
// socket.on('connect', () => {
//   toast.success("Connected to server");
// });

// // Handle connection errors
// socket.on('connect_error', (error) => {
//   toast.error(`Connection error: ${error.message}`);
// });

// // Handle connection timeouts
// socket.on('connect_timeout', () => {
//   toast.error("Connection timeout");
// });

// // Handle other socket errors
// socket.on('error', (error) => {
//   toast.error(`Socket error: ${error.message}`);
// });

// // Handle disconnections
// socket.on('disconnect', (reason) => {
//   toast.warning(`Disconnected from server: ${reason}`);
// });

// export const socketInstance = socket;









// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const SOCKET_SERVER_URL = `${process.env.REACT_APP_API_BASE_PATH}`;

// const UseWebSocket = () => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io(SOCKET_SERVER_URL);

//     newSocket.on('connect', () => {
//       console.log('Connected to server');
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Disconnected from server');
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return socket;
// };

// export default UseWebSocket;


// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const SOCKET_SERVER_URL = `${process.env.REACT_APP_API_BASE_PATH}`;

// const UseWebSocket = () => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io(SOCKET_SERVER_URL);
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return socket;
// };

// export default UseWebSocket;

