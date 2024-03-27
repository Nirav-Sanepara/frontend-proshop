import { socketInstance } from "../utils/socket";
import {useEffect} from 'react'
export const useAddUserEvent = (callback) => {
    useEffect(() => {
      const handleAddUser = (data) => {
        console.log('New user added:', data);
        callback(data);
      };
  
      socketInstance.on('addUser', handleAddUser);
  
      return () => {
        socketInstance.off('addUser', handleAddUser);
      };
    }, [callback]);
  };