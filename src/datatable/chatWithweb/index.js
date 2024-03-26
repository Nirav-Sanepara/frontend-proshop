import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [inpmsg, setinpMsg] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [isClicked,setIsClicked]=useState(false)
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    if(isClicked){
        ws.onopen = () => {
            console.log('WebSocket connection opened');
          };
      
          ws.onmessage = (event) => {
            const newReceivedMessages = [...receivedMessages, event.data];
            setReceivedMessages(newReceivedMessages);
          };
      
        //   ws.onclose = () => {
        //     console.log('WebSocket connection closed');
        //   };
      
          setSocket(ws);
          setIsClicked(false)
          
          return () => {
            ws.close();
          };
          
    }
  }, [receivedMessages,isClicked]);

  const sendMessage = () => {
    if (socket && inpmsg.trim() !== '') {
      socket.send(inpmsg);
      const newSentMessages = [...sentMessages, inpmsg];
      setSentMessages(newSentMessages);
      setinpMsg('');
    }
  };

  return (
    <div>
      <h1>WebSocket React App</h1>
      <input
        type='text'
        placeholder='Enter your query'
        value={inpmsg}
        onChange={(e) => setinpMsg(e.target.value)}
      />
      <button onClick={()=>{
        sendMessage()
        setIsClicked(true)
      }}>Send Message to Server</button>
      <div>
        {sentMessages.length > 0 &&
          sentMessages.map((message, index) => (
            <div key={index}>
              <span style={{ color: 'blue' }}>{message}</span>
              <br />
            </div>
          ))}
        {receivedMessages.length > 0 &&
          receivedMessages.map((message, index) => (
            <div key={index}>
              <span style={{ color: 'green' }}>{message}</span>
              <br />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
