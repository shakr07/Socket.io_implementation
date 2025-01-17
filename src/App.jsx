import { io } from "socket.io-client";
import './App.css';
import { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

function App() {
  const [Message, setMessage] = useState('');
  const [Room, setRoom] = useState('');
  const [socket, setSocket] = useState(null);
  const [socketID, setSocketID] = useState(null);
  const [Messages,setMessages]=useState([]);
  const [roomName, setRoomName] = useState("");


   console.log(Messages);
   console.log(typeof(Messages));
  useEffect(() => {
    // Initialize the socket connection once when the component mounts
    const socketInstance = io('http://localhost:3000');

    // Listen for the connection event
    socketInstance.on("connect", () => {
      console.log("Connected to server:", socketInstance.id);
      setSocketID(socketInstance.id);
    });

    // Listen for messages from the server
    socketInstance.on("received-message", (data) => {
      console.log("Received message from room:", data);
      setMessages((Messages) => {
        return [...Messages, data];   
      });
    });

    // Set the socket instance into the state
    setSocket(socketInstance);

    // Clean up the connection when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleRoomChange = (e) => {
    const newRoom = e.target.value;
    setRoom(newRoom);

   
  };

  const submit = (e) => {
    e.preventDefault();
    if (socket && Room && Message) {
      socket.emit("message", { room: Room, message: Message }); // Send the message to the server
      console.log(`Message sent to room ${Room}: ${Message}`);
    }
    setMessage('');
  };
  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };


  return (
    <>
    
      <Typography variant="h5">{socketID}</Typography>
      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>
      <form onSubmit={submit}>
        <TextField
          value={Room}
          onChange={handleRoomChange} // Join room immediately on change
          label="Room"
          variant="outlined"
        />
        
        <TextField
          value={Message}
          onChange={(e) => setMessage(e.target.value)} // Update Message state
          label="Message"
          variant="outlined"
        />
        
        <Button variant="contained" color="primary" type="submit">Send Message</Button>
       
          {
            (Messages || []).map((ele, index) => {
              return <h1 key={index}>{ele}</h1>;  // Corrected map return
            })
          }
         
      </form>
    </>
  );
}

export default App;
 