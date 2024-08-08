import React, { useEffect, useState } from "react";

const Input = ({socket})=>{

useEffect(()=>{
    socket.on("connect", ()=>{
        console.log("works here too")
    })

    socket.on("welcome",(data)=>{
        console.log(data)
    })
},[])

const [input, setInput] = useState("")

const handleChange = (e)=>{
    setInput(e.target.value)
}

const handleClick = ()=>{
    console.log("hi")
    socket.emit("message",input)
    console.log("hellow")
  }

    return(
        <>
<input type="text" onChange={handleChange} value={input}></input>
<button onClick={handleClick}>click</button>
        </>
    )
}

export default Input;