import React, { useEffect, useState } from "react"
import {io} from "socket.io-client"; 
import Input from "./Input";

const App = ()=>{
const socket = io("http://localhost:3000");

  return(
    <>
<h1>Hamza</h1>
<Input socket={socket}></Input>

    </>
  )
}

export default App
