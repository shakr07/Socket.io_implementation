  import { io } from "socket.io-client";
  import './App.css';
  import { useEffect, useState } from "react";
  import {Button, Container, TextField} from   "@mui/material"
  function App() {
    // Initialize the socket connection
    const socket = io('http://localhost:3000');
    const [Message,useMessage]=useState();
    useEffect(() => {
      // Event handler for socket connection
      socket.on("connect", () => {
        console.log("Connected to server:", socket.id);

        // Emit a welcome event to the server
        socket.on("welcome",(s)=>{
          console.log(s);
        });
      });

  //messaging event jab message even tigger hoga frontend se message log ho jaaega
    socket.on("message",(data)=>{
      console.log(data);
    // io.emit("message",data);
    })
      
      // Clean up the connection on component unmount
        // return () => {
        //   socket.disconnect();
        // };
    }, [socket]); // Dependency array includes 'socket'

    const submit=(e)=>{
      e.preventDefault();

    }

    return (
      <>
     <form onSubmit={submit}>
        <TextField onChange={(e)=>} value={useMessage(e.target.value)} id="1" label="Outlined" variant="outlined" />
        <Button variant="contained" color="primary">click me</Button>
      </form>
      </>
    );
  }

  export default App;
